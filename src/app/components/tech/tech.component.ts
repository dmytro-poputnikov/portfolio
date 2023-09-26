import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { technologies } from 'src/app/constants';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { inView } from 'motion';
import { BallComponent } from '../canvas';

@Component({
  selector: 'app-tech',
  standalone: true,
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.scss'],
  imports: [SharedModule, BallComponent],
})
export class TechComponent implements OnDestroy, AfterViewInit {
  @ViewChild('canvasBalls')
  private sharedCanvasRef: ElementRef | undefined;
  private renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  visible = false;
  screenWidth: number = 0;
  isMobile: boolean = false;
  enableAnimationOfBalls = false;

  @Input() public cameraX: number = 0;
  @Input() public cameraY: number = 0; //red
  @Input() public cameraZ: number = 14;
  @Input() public fieldOfView: number = 45;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.checkIfMobile();
    this.setSize();
  }

  ballPositions: { x: number; y: number; z: number }[] = [];
  technologies = technologies;
  showBalls = false;
  private animationFrameId: number | null = null;

  changeVisibility($event: any) {
    console.log($event);
    this.showBalls = $event;
  }

  constructor() {
    // Utwórz scenę
    this.scene = new THREE.Scene();
    this.scene.position.set(1.5, 1.5, 0);
  }

  checkIfMobile(): void {
    this.isMobile = this.screenWidth < 768; // Adjust the threshold as needed
  }

  ngOnDestroy(): void {
    // Usuń obiekt Three.js z sceny
    if (this.scene) {
      this.scene.children.forEach((object) => {
        this.scene.remove(object);
        // Dodatkowe czyszczenie zasobów (jeśli to jest konieczne) - w zależności od typu obiektu
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose(); // Usuń geometrię obiektu
          object.material.dispose(); // Usuń materiał obiektu
        }
        // Dodatkowe czyszczenie zasobów dla innych typów obiektów
      });

      // Następnie zwolnij pozostałe zasoby, takie jak kamera, renderer itp.
      if (this.renderer) {
        this.renderer.dispose();
      }

      // Oczyść referencje

      if (this.animationFrameId !== null)
        cancelAnimationFrame(this.animationFrameId);
    }
  }

  ngAfterViewInit(): void {
    inView('#canvasBalls', (info) => {
      console.log('VISIBLE');
      this.enableAnimationOfBalls = true;
      return (leaveInfo) => {
        console.log('LEAVE');
        this.enableAnimationOfBalls = false;
      };
    });

    this.screenWidth = window.innerWidth;
    this.checkIfMobile();

    this.calculateBallPositions();
    this.showBalls = true;

    // Wspólny canvas
    const sharedCanvas = this.sharedCanvasRef!.nativeElement;

    // Utwórz renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: sharedCanvas,
      alpha: true,
      preserveDrawingBuffer: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(
      this.sharedCanvasRef?.nativeElement.clientWidth,
      this.sharedCanvasRef?.nativeElement.clientHeight
    );
    this.renderer.setClearColor(0x000000, 0); // the default

    // Utwórz kamerę
    const aspectRatio = sharedCanvas.clientWidth / sharedCanvas.clientHeight;
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0, 0.05);
    this.scene.add(directionalLight);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableZoom = false;

    const render = () => {
      requestAnimationFrame(render);
      this.renderer.render(this.scene!, this.camera!);
    };
    render();
  }

  private calculateBallPositions(): void {
    const ballsPerRow = 5; // Ilość kul na rząd
    const totalBalls = this.technologies.length;

    const separationX = 3;
    const separationY = 3; // Podziel canvas na 3 równe części w pionie

    for (let i = 0; i < totalBalls; i++) {
      const row = Math.floor(i / ballsPerRow);
      const col = i % ballsPerRow;

      const x = (col - ballsPerRow / 2) * separationX;
      const y = -(row - 1) * separationY;
      const z = 0;

      this.ballPositions.push({ x, y, z });
    }
  }

  setSize = () => {
    const sharedCanvas = this.sharedCanvasRef!.nativeElement;
    this.camera.aspect = sharedCanvas.clientWidth / sharedCanvas.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.cdRef.detectChanges();
  };
}
