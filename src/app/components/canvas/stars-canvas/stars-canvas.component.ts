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
import { inView } from 'motion';
import { SharedModule } from 'src/app/shared/shared.module';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import * as random from 'math/random/dist/math-random.esm';

@Component({
  selector: 'app-stars-canvas',
  standalone: true,
  templateUrl: './stars-canvas.component.html',
  styleUrls: ['./stars-canvas.component.scss'],
  imports: [SharedModule],
})
export class StarsCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasStars')
  private canvasContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationFrameId: number | null = null;
  private points: THREE.Points | undefined;

  constructor() {}

  ngAfterViewInit() {
    inView('#canvasStars', () => {
      this.animateStars();

      return (leaveInfo) => {
        this.stopAnimateStars();
      };
    });

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasContainer.nativeElement,
      alpha: true,
      preserveDrawingBuffer: false,
      antialias: false,
    });

    this.camera.position.set(0, 0, 1.5);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(devicePixelRatio * 0.5);

    const sphere = new Float32Array(6000);
    for (let i = 0; i < sphere.length; i += 3) {
      const [x, y, z] = this.randomInSphere(1.2);
      sphere[i] = x;
      sphere[i + 1] = y;
      sphere[i + 2] = z;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(sphere, 3)
    );

    const pointsMaterial = new THREE.PointsMaterial({
      color: '#ffffff',
      size: 0.002,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false,
    });

    this.points = new THREE.Points(pointsGeometry, pointsMaterial);
    this.scene.add(this.points);

    this.renderer.render(this.scene!, this.camera!);
    // this.animateStars();
  }

  private randomInSphere(radius: number) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return [x, y, z];
  }

  private animateStars() {
    if (this.animationFrameId === null) {
      const animate = () => {
        this.animationFrameId = requestAnimationFrame(animate);
        if (this.points) {
          // Obrót wokół osi X (obróć w górę i w dół)
          this.points.rotation.x -= 0.0001; // Możesz dostosować prędkość animacji
          // Obrót wokół osi Y (obróć w lewo i w prawo)
          this.points.rotation.y -= 0.0003; // Możesz dostosować prędkość animacji
          if (this.renderer) this.renderer.render(this.scene!, this.camera!);
        }
      };
      animate();
    }
  }

  private stopAnimateStars() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  ngOnDestroy() {
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

      this.stopAnimateStars();
    }
  }
}
