import axios, { AxiosResponse, AxiosError } from 'axios';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetch } from '@tauri-apps/api/http';
import { MenuNavComponent } from '../templates/menu-nav/menunav.component';
import { MenuFooterComponent } from '../templates/menu-footer/menufooter.component';
import { LobbyComponent } from '../templates/lobby-component/lobby.component';

@Component({
  selector: 'app-search-game',
  templateUrl: './searchgame.component.html',
  styleUrls: ['./searchgame.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MenuNavComponent,
    MenuFooterComponent,
    LobbyComponent
  ],
})

export class SearchGameComponent implements OnInit {

  lobbyData: any;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchLobby();
  }

  toMenu() {
    this.router.navigate(['']);
  }

  joinGame(value:number) {
    console.log("Game ID:" + value);
  }

  async fetchLobby() {
    try {

      const response = await fetch('http://129.152.28.27:5000/listLobby', {
        method: 'GET',
      });
      const data: any = await response.data;
      console.log(data["lobby"].length);
      this.lobbyData = data["lobby"];
    } catch (error) {
      console.error('Error fetching lobby data:', error);
    }
  }
}