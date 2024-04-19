import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { invoke } from "@tauri-apps/api/tauri";
import { Router } from '@angular/router';
import { appWindow } from '@tauri-apps/api/window'
import { LobbyItemComponent } from '../templates/lobby-item/lobby-item.component';
import { ChangeDetectorRef } from '@angular/core';
import { fetch } from '@tauri-apps/api/http';

class ClientData {
  constructor(
    public name?: string | null,
    public serverId?: string | null,
    public lobbyId?: string | null
  ) {}
}

@Component({
  selector: 'app-lobby-room',
  standalone: true,
  imports: [
    CommonModule, 
    LobbyItemComponent
  ],
  templateUrl: './lobby-room.component.html',
  styleUrls: ['./lobby-room.component.scss']
})
export class LobbyRoomComponent implements OnInit {
  @ViewChild('Something') testText!: ElementRef;

  clientData_: ClientData = new ClientData();
  lobbyData: any[] = [];

  unlisten:any = null;

  constructor(private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {

    try {
      this.clientData_ = history.state.clientData;
      console.log(this.clientData_);
    } catch {

    }

    
    this.startListen();

    let frames = document.getElementsByClassName('frame');
    const frameCount = frames.length;
    console.log(frames);
    console.log(frames + " - " + frameCount);

    setInterval(() => {
      this.changeFrameClass(frames);
    }, 5000);


    this.updateLobbyList();

    console.log(this.clientData_.lobbyId)
  }
  

  async updateLobbyList() {
    try {
      const response = await fetch('http://129.152.28.27:5000/lobbyInfo/four/' + this.clientData_.lobbyId, {
        method: 'GET',
      });
      const data: any = await response.data;


      const jsonData = data["users"];
      this.lobbyData = jsonData;
      //console.log(this.lobbyData);
      //console.log("hey api" + this.lobbyData);
    } catch (error) {
      console.error('Error fetching lobby data:', error);
    }

    this.cdr.detectChanges();
  }

  ngAfterViewInit() {

  }

  async startListen() {
    console.log("started");
    this.unlisten = await appWindow.listen<string>('message_from_server', (event) => {
      console.log(event);
      const [action, datas] = event.payload.toString().split('§', 2);
      this.process_action(action, datas);
      invoke('send_message', { message: "clientLog§Client Connesso"});
    });
  }

  changeFrameClass(frames: any) {
    for(let i = 0; i < frames.length; i++)
    {
      if(frames[i].classList.contains("left-frame")) {
        frames[i].classList.remove("left-frame");
        frames[i].classList.add("current-frame");
      } 
      else if(frames[i].classList.contains("current-frame")) {
        frames[i].classList.remove("current-frame");
        frames[i].classList.add("right-frame");
      }
      else if(frames[i].classList.contains("right-frame")) {
        frames[i].classList.remove("right-frame");
        frames[i].classList.add("last-frame");
      }
      else if(frames[i].classList.contains("last-frame")) {
        frames[i].classList.remove("last-frame");
        frames[i].classList.add("left-frame");
      }
    }
  }

  ngOnInit(): void {
    
  }

  actionHandlers: Record<string, (data?: string) => void> = {
    "serverLog": (data) => {
      console.log("Server << " + data);
    },
    "lobbyJoined": (data) => {
      this.clientData_.lobbyId = data !== undefined ? String(data) : null;
    },
    "updateLobbyPlayers": (data) => {
      console.log(data);
      console.log(this.clientData_.lobbyId);
      this.updateLobbyList();
    },
    "error": (data) => {
      console.log("Server >> " + data)
    },
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

}
