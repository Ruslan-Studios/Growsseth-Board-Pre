import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { invoke } from "@tauri-apps/api/tauri";
import { app } from '@tauri-apps/api';
import { Router } from '@angular/router';
import axios from 'axios';
import { appWindow } from '@tauri-apps/api/window'
import { message } from '@tauri-apps/api/dialog';

class ClientData {
  constructor(
    public name?: string | null,
    public serverId?: string | null,
    public lobbyId?: string | null
  ) {}
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './creategame.component.html'
})

export class CreateGameComponent implements OnInit {

  @ViewChild('playerNameInput') playerName!: ElementRef;
  @ViewChild('roomNameInput') roomName!: ElementRef;
  @ViewChild('roomHasPassword') hasPass!: ElementRef;
  @ViewChild('roomPassInput') passInput!: ElementRef;

  clientData_: ClientData = new ClientData();

  actionHandlers: Record<string, (data?: string) => void> = {
    "serverConnectionSuccessfull": (data) => {
      this.clientData_.serverId = data !== undefined ? String(data) : null;
      // Here, clientSocket is not defined, so I'm assuming it's handled elsewhere
      // Adjust this line according to your needs
      // clientSocket.write("setName§" + this.clientData.serverId + "§" + this.clientData.name);
    },
    "serverLog": (data) => {
      console.log("Server << " + data);
    },
    "serverFull": () => { 
      console.error("Error: Server Full -> Disconnected");
      process.exit(0); 
    },
    "setServerId": (data) => {
      this.clientData_.serverId = data !== undefined ? String(data) : null;
    },
    "lobbyJoined": (data) => {
      this.clientData_.lobbyId = data !== undefined ? String(data) : null;
    },
    "lobbyCreated": (data) => {
      this.clientData_.lobbyId = data !== undefined ? String(data) : null;
      console.log("Client >> Lobby created and joined");
    },
    "error": (data) => {
      console.log("Server >> " + data)
    }
  };
  
  ngOnInit() {
    
  }

  async startConnection() {
    console.log("Starting");


    const unlisten = await appWindow.listen<string>('message_from_server', (event) => {
      console.log(event);
      const [action, datas] = event.payload.toString().split('§', 2);
      this.process_action(action, datas);
      invoke('send_message', { message: "clientLog§Client Connesso"});
    });
    
    try {
      let i: any = invoke('start_listening');
      i.then((value: any) => {
          if(value != null)
          {
            this.router.navigate(['']);
          }
      });
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
    }
  }

  process_action(action: string, data?: string) {
    const handler = this.actionHandlers[action];
    if (handler) {
      try {
        handler(data);
        console.log(`Action processed: ${action}${data ? ', data: ' + data : ''}`);
      } catch {
        console.error(`Error executing action: ${action}`);
      }
    } else {
      console.error(`Action not handled: ${action}`);
    }
  }

  constructor(private router: Router) {
    this.startConnection();
  }

  toMenu() {
    this.router.navigate(['']);
  }



  async createRoom() {
    try {
      let name = this.playerName.nativeElement.value;
      let roomName = this.roomName.nativeElement.value;
      let passOn = this.hasPass.nativeElement.value;
      let password = this.passInput.nativeElement.value;

      if(passOn == "On")
        passOn = '1'
      else
        passOn = '0'
      
      if(name == "" || roomName == "")
      {
        throw new Error("Input field empty");
      }

      if(passOn == '1' && password != "") {
        throw new Error("Password set but input empty");
      }

      this.clientData_.name = name;

      invoke('send_message', { message: "setName§" + this.clientData_.serverId + "§" + this.clientData_.name });
      if(passOn == '1')
        invoke('send_message', { message: "createLobby§" + this.clientData_.serverId + "§" + roomName + "§" + passOn + "§" + password});
      else
        invoke('send_message', { message: "createLobby§" + this.clientData_.serverId + "§" + roomName + "§" + passOn});

      //this.webSocketService.connect();
      
    } catch (error) {
      console.error('Error fetching lobby data:', error);
    }
  }

}