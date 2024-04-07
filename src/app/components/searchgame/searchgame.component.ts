import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { invoke } from "@tauri-apps/api/tauri";
import { app } from '@tauri-apps/api';
import { Router } from '@angular/router';
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
  templateUrl: './searchgame.component.html',
  styleUrls: ['./searchgame.component.scss']
})

export class SearchGameComponent {

  constructor(private router: Router) {

  }

  toMenu() {
    this.router.navigate(['']);
  }
}