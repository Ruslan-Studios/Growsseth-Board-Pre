import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { exit } from '@tauri-apps/api/process';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menunav.component.html',
  styleUrls: ['./menunav.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MenuNavComponent implements OnInit {

  constructor(private router: Router) {

  }

  toMenu() {
    this.router.navigate(['']);
  }

  toOptions() {
    this.router.navigate(['options']);
  }

  quitApp() {
    //Do Something then quit
  }

  ngOnInit(): void {
  }

}