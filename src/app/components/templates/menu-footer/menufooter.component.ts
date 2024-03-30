import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { app } from '@tauri-apps/api';

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menufooter.component.html',
  styleUrls: ['./menufooter.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MenuFooterComponent implements OnInit {

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