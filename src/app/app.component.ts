import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { invoke } from "@tauri-apps/api/tauri";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html'
})

export class AppComponent {
  @HostListener('window:contextmenu', ['$event'])
  
  onRightClick(event: MouseEvent) {
    event.preventDefault(); // Prevent the browser's default context menu
  }
}