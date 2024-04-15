import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

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
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    orbit = new OrbitControls(this.camera, this.renderer.domElement);

    gltfLoader = new GLTFLoader();

    directionalLight = new THREE.DirectionalLight(0xFFFFFF, 5.0);
    dLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 5);

    axesHelper = new THREE.AxesHelper;
    gridHelper = new THREE.GridHelper(30, 50);

    mesh: THREE.Mesh;

    constructor()
    {
      // this.gltfLoader.load

      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.camera.position.set(20, 0, 0);

      let geometry = new THREE.BoxGeometry(10, 10, 10);
      let material = new THREE.MeshStandardMaterial({color: 0xff0000});
      this.mesh = new THREE.Mesh(geometry, material);

      this.scene.add(this.mesh);

      this.directionalLight.position.set(0, 15, 0);
      this.scene.add(this.directionalLight);
      this.scene.add(this.dLightHelper);

      this.scene.add(this.axesHelper);
      this.scene.add(this.gridHelper);
    }

    ngAfterViewInit()
    {
      this.renderer.render(this.scene, this.camera);
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
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