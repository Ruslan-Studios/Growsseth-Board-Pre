import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { invoke } from "@tauri-apps/api/tauri";
import { app } from '@tauri-apps/api';

@Component
(
  {
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './../html/menu.component.html',
    styleUrl: './../css/menu.component.scss'
  }
)

export class MenuComponent implements OnInit
{

  gameVersion: string = '';

  ngOnInit()
  {
    this.getVersion();
  }

  async getVersion()
  {
    try
    {
      const version = await app.getVersion();
      this.gameVersion = version;
    } catch (error)
    {
      console.error('Error getting app version:', error);
    }
  }

}