// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{window, Window};
use tokio::net::TcpStream;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use std::error::Error;

const HOST_IP: &str = "127.0.0.1";
const HOST_PORT: &str = "1105";

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String
{
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn send_message(message: String) -> Result<(), String> {
    let mut stream = match TcpStream::connect("127.0.0.1:1105").await {
        Ok(s) => s,
        Err(e) => return Err(e.to_string()),
    };
    stream.write_all(message.as_bytes()).await;
    Ok(())
}

#[tauri::command]
async fn start_listening(window: tauri::Window) -> Result<(), String> {
    let mut stream = match TcpStream::connect("127.0.0.1:1105").await {
        Ok(s) => s,
        Err(e) => return Err(e.to_string()),
    };

    tokio::spawn(async move {
        let mut buffer = [0; 1024];
        loop {
            match stream.read(&mut buffer).await {
                Ok(n) if n == 0 => {
                    println!("Connection was closed by the server.");
                    break;
                },
                Ok(n) => {
                    let msg = String::from_utf8_lossy(&buffer[..n]).to_string();
                    if window.emit("message_from_server", &msg).is_err() {
                        eprintln!("Failed to send event");
                    }
                },
                Err(e) => {
                    eprintln!("Failed to read from socket: {}", e);
                    break;
                }
            };
        }
    });

    Ok(())
}

fn main()
{
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start_listening, send_message])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}