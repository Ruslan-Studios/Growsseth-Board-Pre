import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { app } from '@tauri-apps/api';
import { MenuNavComponent } from '../templates/menu-nav/menunav.component';
import { MenuFooterComponent } from '../templates/menu-footer/menufooter.component';
import { primaryMonitor } from '@tauri-apps/api/window';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    CommonModule, 
    RouterOutlet, 
    MenuNavComponent,
    MenuFooterComponent
  ],

  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})

export class OptionsComponent
{
  standardResolutions: number[][] = [
    [720, 512],
    [1080, 768],
    [1440, 1024]
  ]

  currentResolution: number[] = [];
  vSync: boolean = true;
  cardEffectCounter: number = 2; // 0 = Low - 1 = Medium - 2 = High

  onNewResSelected(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const selectedElement = event.target as HTMLSelectElement;
    selectedElement.options[0].text = "Resolution: " + selectedValue;
    selectedElement.options[0].selected = true;
    console.log('Selected option:', selectedValue);
}

  constructor(private router: Router) {


    while(false) {
      if(this.standardResolutions[this.standardResolutions.length - 1][0] * 1.25 < 2) {

      }
    }
  }

  toMenu() {
    this.router.navigate(['']);
  }
}