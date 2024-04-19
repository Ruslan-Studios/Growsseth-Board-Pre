import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { invoke } from "@tauri-apps/api/tauri";
import axios from 'axios';
import { appWindow } from '@tauri-apps/api/window'
import { app } from '@tauri-apps/api';
import { Router } from '@angular/router';

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
  templateUrl: './joinrandom.component.html'
})

export class JoinRandomComponent {

  @ViewChild('playerNameInput') playerName!: ElementRef;

  clientData_: ClientData = new ClientData();
  unlisten: any;
  
  constructor(private router: Router) {
    this.startConnection();
  }

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
      this.router.navigate(['']);
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
      
      const navigationExtras = {
        state: {
          clientData: this.clientData_
        }
      };

      this.router.navigate(['lobbyRoom'], navigationExtras);
    },
    "error": (data) => {
      console.log("Server >> " + data)
    },
    "doLobbyExist" : (data) => {
      if(data != "None") {
        data = data?.replace('serverLog', '')
        invoke('send_message', { message: "joinRandomLobby§" + this.clientData_.serverId + "§" + data}).then( result => {
          console.log("Client >> Joined random Lobby");
          this.clientData_.lobbyId = data;
          const navigationExtras = {
            state: {
              clientData: this.clientData_
            }
          };
          this.unlisten();
          this.router.navigate(['lobbyRoom'], navigationExtras);
        });
      }
    }
  };

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

  async startConnection() {
    console.log("Starting");


    this.unlisten = await appWindow.listen<string>('message_from_server', (event) => {
      console.log(event);
      const [action, datas] = event.payload.toString().split('§', 2);
      this.process_action(action, datas);
      invoke('send_message', { message: "clientLog§Client Connesso"});
    });
    
    try {
      invoke('start_listening')
      .then((e) => {
        console.log(e);
      })
      .catch((e => {
        this.router.navigate(['']);
      }));
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
    }
  }

  toMenu() {
    this.router.navigate(['']);
  }

  async randomJoinRoom() {
    try {
      let name = this.playerName.nativeElement.value;

      if(name == "")
      {
        throw new Error("Input field empty");
      }

      this.clientData_.name = name;
      invoke('send_message', { message: "setName§" + this.clientData_.serverId + "§" + this.clientData_.name });
      
      invoke('send_message', { message: "anyLobbyExist§" + this.clientData_.serverId}); // 0 = no pass | 1 = also pass
      
    } catch (error) {
      console.error('Error fetching lobby data:', error);
    }
  }

}