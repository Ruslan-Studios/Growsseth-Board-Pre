import axios, { AxiosResponse, AxiosError } from 'axios';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
      const response = await axios.get('http://127.0.0.1:5000/listLobby');

      const jsonData = JSON.parse(response.data);

      this.lobbyData = jsonData.lobby;
      console.log(this.lobbyData);
    } catch (error) {
      console.error('Error fetching lobby data:', error);
    }
  }
}