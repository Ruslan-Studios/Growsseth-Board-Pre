// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use discord_rich_presence::activity::Assets;
use tauri::{window, Window};
use tokio::net::TcpStream;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use std::error::Error;
use discord_rich_presence::{activity, DiscordIpc, DiscordIpcClient};
use serde::{Deserialize, Serialize};

const HOST_IP: &str = "129.152.28.27";
const HOST_PORT: &str = "1105";

#[derive(Debug, Deserialize, Serialize)]
struct User {
    id: String,
    name: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct LobbyInfo {
    users: Vec<User>,
}

#[tauri::command]
async fn send_message(message: String) -> Result<(), String> {
    let mut stream = match TcpStream::connect(HOST_IP.to_string() + ":" + HOST_PORT).await {
        Ok(s) => s,
        Err(e) => return Err(e.to_string()),
    };

    if let Err(e) = stream.write_all(message.as_bytes()).await {
        return Err(e.to_string());
    }

    // Explicitly close the connection by dropping the stream
    drop(stream);

    Ok(())
}

#[tauri::command]
async fn start_listening(window: tauri::Window) -> Result<(), String> {
    let mut stream = match TcpStream::connect(HOST_IP.to_string() + ":" + HOST_PORT).await {
        Ok(s) => s,
        Err(e) => { return Err("Impossibile Connettere".to_string())},
    };

    tokio::spawn(async move {
        let mut buffer = [0; 1024];
        loop {
            //println!("Test");
            match stream.read(&mut buffer).await {
                Ok(n) if n == 0 => {
                    println!("Connection was closed by the server.");
                    break;
                },
                Ok(n) => {
                    let msg = String::from_utf8_lossy(&buffer[..n]).to_string();
                    println!("{}", msg);
                    if window.emit("message_from_server", &msg).is_err() {
                        eprintln!("Failed to send event");
                    }

                    if &msg == "serverFull" {
                        break;
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

fn main()  -> Result<(), Box<dyn std::error::Error>>
{

    let mut client = DiscordIpcClient::new("1230804371114299404")?;

    client.connect()?;
    client.set_activity(activity::Activity::new()
        .details("In the Menu")
        .assets(Assets::new().large_image("logo").large_text("growsseth board logo"))
    )?;

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start_listening, send_message])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}