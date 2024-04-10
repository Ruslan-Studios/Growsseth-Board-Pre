import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { app } from '@tauri-apps/api';
import { MenuNavComponent } from '../templates/menu-nav/menunav.component';
import { MenuFooterComponent } from '../templates/menu-footer/menufooter.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    CommonModule, 
    RouterOutlet, 
    MenuNavComponent,
    MenuFooterComponent
  ],

  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent
{
  constructor(private router: Router) {

  }

  toCreateGame() {
    this.router.navigate(['createGame']);
  }

  toSearch() {
    this.router.navigate(['searchGame']);
  }

  toRandom() {
    this.router.navigate(['searchRandom']);
  }

  to3D() {
    this.router.navigate(['threeScene']);
  }
}