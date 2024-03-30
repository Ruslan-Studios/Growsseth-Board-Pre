import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { app } from '@tauri-apps/api';
import { MenuNavComponent } from '../templates/menu-nav/menunav.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    CommonModule, 
    RouterOutlet, 
    MenuNavComponent
  ],

  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})

export class OptionsComponent
{

  constructor(private router: Router) {

  }

  toMenu() {
    this.router.navigate(['']);
  }

}