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
  private animationId?: number;
  private points: THREE.Points | undefined;

  constructor() {}

  ngAfterViewInit() {
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
      preserveDrawingBuffer: true,
      antialias: true,
    });

    this.camera.position.set(0, 0, 1.5);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

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

    this.animate();
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
  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private animateStars() {
    if (this.points) {
      // Obrót wokół osi X (obróć w górę i w dół)
      this.points.rotation.x -= 0.0001; // Możesz dostosować prędkość animacji

      // Obrót wokół osi Y (obróć w lewo i w prawo)
      this.points.rotation.y -= 0.0003; // Możesz dostosować prędkość animacji
    }
  }

  private animate() {
    let component: StarsCanvasComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateStars();
      component.renderer.render(component.scene, component.camera);
    })();
  }
}
