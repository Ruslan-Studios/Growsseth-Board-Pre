import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
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
export class MainmenuComponent implements OnInit, AfterViewInit
{
  @ViewChild('rendererContainer')
  private rendererCanvas!: ElementRef;

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  // CAMERA
  @Input() public cameraY: number = 15;
  @Input() public cameraXRot: number = (90 / 180) * Math.PI;
  @Input() public FOV: number = 75;
  @Input('nearClip') public nearClippingPlane: number = 0.1;
  @Input('farClip') public farClippingPlane: number = 1000;

  private camera!: THREE.PerspectiveCamera;
  private orbit!: OrbitControls;

  // LUCI
  //directionalLight = new THREE.DirectionalLight(0xFFFFFF, 5.0);
  private ambientLight!: THREE.AmbientLight;

  // IMPORTAZIONE MODELLI 3D
  // - Loader
  gltfLoader = new GLTFLoader(); // Modelli
  rgbeLoader = new RGBELoader(); // HDRI
  // - Modelli
  bookModel: any; // Quale cazzo è il tipo del modello? GLTF non me lo fa mettere boh
  
  // HELPER
  axesHelper = new THREE.AxesHelper;
  gridHelper = new THREE.GridHelper(30, 50);
  //dLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 5);

  private getAspectRatio(): number
  {
    return window.innerWidth / window.innerHeight;
  }

  private createScene()
  {
    console.log("Creando scena");

    // Scena
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0x000000);
    
    // Camera
    let aspectRatio = this.getAspectRatio();

    this.camera = new THREE.PerspectiveCamera
    (
      this.FOV,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.y = this.cameraY;
    this.camera.rotation.x = this.cameraXRot;

    // Luci
    this.ambientLight = new THREE.AmbientLight(0xFFFFFF);
    this.scene.add(this.ambientLight);

    // Helper
    this.scene.add(this.axesHelper);
    this.scene.add(this.gridHelper);

    // Init modelli e texture
    this.gltfLoader.load('../../../assets/models/book/OurBook.gltf', (book) =>
      {
        this.scene.add(book.scene);
        this.bookModel = book;
      },
      (xhr) =>
      {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) =>
      {
        console.error('Errore nel caricamento del modello: ', error);
      }
    );
  }

  private startRenderingLoop()
  {
    console.log("Startando rendering loop");
    this.renderer = new THREE.WebGLRenderer({canvas: this.rendererCanvas.nativeElement});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    let component: MainmenuComponent = this;

    // this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.lookAt(0, 0, 0);

    function render()
    {
      console.log("madonna troia ti renderizzo tutto");

      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
    }

    render();
  }

  ngOnInit(): void
  {
    console.log("sivalletto?");
  }

  ngAfterViewInit(): void
  {
    console.log("de, pefforza");

    this.createScene();
    this.startRenderingLoop();
  }
}