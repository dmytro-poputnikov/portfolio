import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry';

@Component({
  selector: 'app-ball',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
})
export class BallComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() enableAnimationOfBalls = false;
  @Input() id: string = '';
  @Input() texture: string = '/assets/texture.jpg';
  @Input() canvasRef: HTMLCanvasElement | undefined;
  @Input() scene: THREE.Scene | undefined;
  @Input() camera: THREE.PerspectiveCamera | undefined;
  @Input() position: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };

  private renderer!: THREE.WebGLRenderer;
  private ball: THREE.Mesh | undefined;
  private loader = new THREE.TextureLoader();
  private geometry = new THREE.IcosahedronGeometry(1, 3);
  private material: THREE.MeshStandardMaterial | undefined;
  private decalGeometry: DecalGeometry | undefined;
  private decalMaterial: THREE.MeshStandardMaterial | undefined;
  private decalMesh: THREE.Mesh | undefined;
  private animationFrameId: number | null = null;
  //* ball Properties
  @Input() public rotationSpeedX: number = 0.05;
  @Input() public rotationSpeedY: number = 0.01;

  //* Stage Properties
  @Input() public cameraX: number = 0;
  @Input() public cameraY: number = 0; //red
  @Input() public cameraZ: number = 120;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef!;
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Inicjalizacja geometrii, materiałów i innych właściwości "balla"
    // this.decalMesh.scale.set(2.85, 2.85, 2.85);
  }

  ngAfterViewInit() {
    this.initializeBall();

    // Inicjalizacja renderera, kamery na wspólnym canvasie
    if (this.canvas) {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        preserveDrawingBuffer: false,
        antialias: false,
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

      this.renderer.setClearColor(0x000000, 0); // the default
    }

    this.animateBall();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['enableAnimationOfBalls']) {
      console.log(changes['enableAnimationOfBalls'].currentValue);
      if (changes['enableAnimationOfBalls'].currentValue) this.animateBall();
      else this.stopAnimateBall();
    }
  }

  /**
   *Animate the ball
   *
   * @private
   * @memberof BallComponent
   */
  private animateBall() {
    if (this.animationFrameId === null) {
      const animate = () => {
        this.animationFrameId = requestAnimationFrame(animate);

        if (this.ball && this.decalMesh) {
          const amplitude = 10; // Amplituda ruchu (ilość stopni)
          const frequency = 0.04; // Częstotliwość ruchu

          const time = performance.now() * 0.03; // Aktualny czas
          const rotationX = amplitude * Math.sin(frequency * time);
          const rotationY = amplitude * Math.cos(frequency * time);

          this.ball.rotation.x = THREE.MathUtils.degToRad(rotationX);
          this.ball.rotation.y = THREE.MathUtils.degToRad(rotationY);
          this.decalMesh.rotation.x = THREE.MathUtils.degToRad(rotationX);
          this.decalMesh.rotation.y = THREE.MathUtils.degToRad(rotationY);
        }
      };

      animate();
    }
  }

  private stopAnimateBall() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private initializeBall() {
    // Inicjalizacja geometrii, materiałów i logiki obrotu "balla"
    // Tworzenie materiału na podstawie wartości texture
    this.material = new THREE.MeshStandardMaterial({
      color: '#fff8eb',
      polygonOffset: true,
      polygonOffsetFactor: 5, // Dostosuj te wartości według potrzeb
      flatShading: true,
      //side: THREE.DoubleSide, // Renderuj od obu stron
    });

    // Tworzenie obiektu ball i dekali
    this.ball = new THREE.Mesh(this.geometry, this.material);
    this.ball.position.set(this.position.x, this.position.y, this.position.z);

    //* Refactoring mesh
    this.ball.scale.set(1, 1, 1);
    this.ball.receiveShadow = true;
    this.ball.castShadow = true;

    this.decalGeometry = new DecalGeometry(
      this.ball,
      new THREE.Vector3(0, 0, 1),
      new THREE.Euler(0, 0, 0),
      new THREE.Vector3(1.5, 1.5, 1.5)
    );

    this.decalMaterial = new THREE.MeshStandardMaterial({
      map: this.loader.load(this.texture),
      color: '#fff8eb',
      alphaTest: 0.5, // Dodaj tę właściwość
      polygonOffset: true,
      flatShading: true,
      side: THREE.FrontSide,
    });
    this.decalMesh = new THREE.Mesh(this.decalGeometry, this.decalMaterial);
    this.decalMesh.position.set(
      this.position.x,
      this.position.y,
      this.position.z
    );

    if (this.scene && this.ball && this.decalMesh) {
      this.scene.add(this.ball);
      this.scene.add(this.decalMesh);
    }
  }

  ngOnDestroy() {
    // Następnie zwolnij pozostałe zasoby, takie jak kamera, renderer itp.
    if (this.renderer) {
      this.renderer.forceContextLoss();
      this.renderer.dispose();
    }

    // Oczyść referencje

    this.stopAnimateBall();
  }
}
