import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { invoke } from "@tauri-apps/api/tauri";
import { app } from '@tauri-apps/api';
import { Router } from '@angular/router';
import axios from 'axios';
import { appWindow } from '@tauri-apps/api/window'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './creategame.component.html'
})


export class CreateGameComponent implements OnInit {

  @ViewChild('playerNameInput') playerName!: ElementRef;

  ngOnInit() {
    
  }

  constructor(private router: Router) {
    
  }

  toMenu() {
    this.router.navigate(['']);
  }

  async createRoom() {
    try {
      let name = this.playerName.nativeElement.value;
      if(name == "")
      {
        throw new Error("Input field empty");
      }

      const unlisten = await appWindow.listen<string>('message_from_server', (event) => {
        console.log(event.payload);
        invoke('send_message', { message: "clientLog§messageReceived" });
      });
      
      await invoke('start_listening');

      //this.webSocketService.connect();
      
    } catch (error) {
      console.error('Error fetching lobby data:', error);
    }
  }

}