import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-mainmenu',
  standalone: true,
  imports: [],
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.scss'
})
export class MainmenuComponent
{
  @ViewChild('rendererContainer')
  rendererContainer!: ElementRef;

    renderer = new THREE.WebGLRenderer();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    mesh: THREE.Mesh;

    constructor()
    {
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.camera.position.z = 1000;

      const geometry = new THREE.BoxGeometry(200, 200, 200);
      const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
      this.mesh = new THREE.Mesh(geometry, material);

      this.scene.add(this.mesh);
    }

    ngAfterViewInit()
    {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement)
        this.animate();
    }

    animate()
    {
        window.requestAnimationFrame(() => this.animate())
        this.mesh.rotation.x += 0.01
        this.mesh.rotation.y += 0.02
        this.renderer.render(this.scene, this.camera)
    }
}