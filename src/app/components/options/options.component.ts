import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})

export class OptionsComponent
{

  standardResolutions: number[][] = [
    [1440, 1024],
    [1080, 768],
    [720, 512]
  ]

  onNewResSelected(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const selectedElement = event.target as HTMLSelectElement;
    selectedElement.options[0].text = "Resolution: " + selectedValue;
    selectedElement.options[0].selected = true;
    console.log('Selected option:', selectedValue);
}

  constructor(private router: Router) {

  }

  toMenu() {
    this.router.navigate(['']);
  }

}