import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
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

  constructor(private router: Router) {

  }

  toCreateGame() {
    this.router.navigate(['game']);
  }

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