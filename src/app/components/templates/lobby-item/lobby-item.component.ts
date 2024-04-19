import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { exit } from '@tauri-apps/api/process';

@Component({
  selector: 'app-player-item',
  standalone: true,
  imports: [],
  templateUrl: './lobby-item.component.html',
  styleUrl: './lobby-item.component.scss'
})

export class LobbyItemComponent {
  @Input() playerName: string = '???';
}
