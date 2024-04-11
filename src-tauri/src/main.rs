// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use dotenv;
use public_ip_addr::get_public_ip;


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String
{
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn retrieve_env() -> String
{
    let api_key = "four";
    api_key.to_string()
}

#[tauri::command]
async fn retrieve_ip() -> String
{
    let ip = get_public_ip().await.unwrap();
    ip
}

fn main()
{
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, retrieve_env, retrieve_ip])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}