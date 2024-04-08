import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { exit } from '@tauri-apps/api/process';

@Component({
  selector: 'app-lobby-item',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  standalone: true,
  imports: [CommonModule]
})

export class LobbyComponent {
    @Input() playerName: string = '???';
    @Input() playerCount: number = 1;
}