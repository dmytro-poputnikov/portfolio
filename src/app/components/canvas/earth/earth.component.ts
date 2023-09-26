import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { animate, inView } from 'motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-earth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './earth.component.html',
  styleUrls: ['./earth.component.scss'],
})
export class EarthComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasEarth')
  private canvasRef!: ElementRef;
  private animationShowed = false;

  //* earth Properties
  @Input() public rotationSpeedX: number = 0.002;
  @Input() public rotationSpeedY: number = 0.01;
  @Input() public size: number = 200;

  //* Stage Properties
  @Input() public cameraX: number = -4;
  @Input() public cameraY: number = 3; //red
  @Input() public cameraZ: number = 6;
  @Input() public fieldOfView: number = 45;
  @Input('nearClipping') public nearClippingPlane: number = 0.1;
  @Input('farClipping') public farClippingPlane: number = 200;

  //? Helper Properties (Private Properties);
  private animationFrameId: number | null = null;
  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef!.nativeElement;
  }
  private earth: GLTF | undefined;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private loaderGLTF = new GLTFLoader();

  /**
   * Get computer gltf (Async function)
   * @private
   * @memberof
   */
  private async loadEarthGltf() {
    this.earth = await this.loaderGLTF.loadAsync(
      'assets/public/planet/scene.gltf'
    );
  }

  private animateEarth() {
    if (this.animationFrameId === null && this.renderer) {
      const animate = () => {
        this.animationFrameId = requestAnimationFrame(animate);
        if (this.earth) this.earth.scene.rotation.y += this.rotationSpeedX;

        this.renderer.render(this.scene!, this.camera!);
      };
      animate();
    }
  }

  private stopAnimateEarth() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Create the scene
   *
   * @private
   * @memberof EarthComponent
   */
  private async createScene() {
    await this.loadEarthGltf();

    if (!this.earth) return;
    this.earth.scene.scale.set(2.5, 2.5, 2.5);
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.add(this.earth.scene);

    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.x = this.cameraX;
    this.camera.position.y = this.cameraY;
    this.camera.position.z = this.cameraZ;

    //*Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0, 0.05);
    this.scene.add(directionalLight);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Start the rendering loop
   *
   * @private
   * @memberof EarthComponent
   */
  private startRenderingLoop() {
    console.log(this.earth);
    if (!this.earth) return;

    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      preserveDrawingBuffer: false,
      antialias: false,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    //Rotation
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    this.renderer.render(this.scene!, this.camera!);
    // this.animateEarth();

    // this.position = this.camera.position;
    // controls.addEventListener('change', () => {
    //   this.position = this.camera.position; // Aktualna rotacja względem osi x
    //   this.cdRef.detectChanges();
    // });
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  async ngAfterViewInit() {
    await this.createScene();
    await this.startRenderingLoop();
    this.animate();
  }

  animate() {
    inView('#canvasEarth', (canvas) => {
      this.animateEarth();
      if (!this.animationShowed) {
        this.animationShowed = true;
        animate(
          canvas.target,
          {
            opacity: 1,
            x: [100, 0],
          },
          {
            duration: 1,
            delay: 0.1,
            easing: 'ease-in',
            allowWebkitAcceleration: true,
          }
        );
      }

      return (leaveInfo) => {
        this.stopAnimateEarth();
      };
    });
  }

  ngOnDestroy(): void {
    // Usuń obiekt Three.js z sceny
    if (this.scene) {
      this.scene.children.forEach((obj) => {
        // Dodatkowe czyszczenie zasobów (jeśli to jest konieczne) - w zależności od typu obiektu
        if (obj instanceof THREE.Mesh) {
          if (obj.material.map) {
            obj.material.map.dispose();
          }
          if (obj.material.lightMap) {
            obj.material.lightMap.dispose();
          }
          if (obj.material.aoMap) {
            obj.material.aoMap.dispose();
          }
          if (obj.material.emissiveMap) {
            obj.material.emissiveMap.dispose();
          }
          if (obj.material.bumpMap) {
            obj.material.bumpMap.dispose();
          }
          if (obj.material.normalMap) {
            obj.material.normalMap.dispose();
          }
          if (obj.material.displacementMap) {
            obj.material.displacementMap.dispose();
          }
          if (obj.material.roughnessMap) {
            obj.material.roughnessMap.dispose();
          }
          if (obj.material.metalnessMap) {
            obj.material.metalnessMap.dispose();
          }
          if (obj.material.alphaMap) {
            obj.material.alphaMap.dispose();
          }

          if (obj.geometry) {
            obj.geometry.dispose();
          }
          this.scene.remove(obj);
        }
      });

      // Następnie zwolnij pozostałe zasoby, takie jak kamera, renderer itp.
      if (this.renderer) {
        this.renderer.forceContextLoss();
        this.renderer.dispose();
      }

      // Oczyść referencje

      this.stopAnimateEarth();
    }

    // Oczyść referencje
    this.earth = undefined;
    if (this.animationFrameId !== null)
      cancelAnimationFrame(this.animationFrameId);
  }
}
