import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
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
export class BallComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  private canvasRef: ElementRef | undefined;

  public position: any;
  @Input() public id = '';

  //* ball Properties
  @Input() public rotationSpeedX: number = 0.05;
  @Input() public rotationSpeedY: number = 0.01;
  @Input() public size: number = 200;
  @Input() public texture: string = '/assets/texture.jpg';

  //* Stage Properties
  @Input() public cameraX: number = 0;
  @Input() public cameraY: number = 0; //red
  @Input() public cameraZ: number = 120;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  //? Helper Properties (Private Properties);
  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef!.nativeElement;
  }
  private loader = new THREE.TextureLoader();
  private geometry = new THREE.IcosahedronGeometry(1, 2);
  private material: THREE.MeshStandardMaterial | undefined;

  private ball: THREE.Mesh | undefined;
  private decalGeometry: DecalGeometry | undefined;
  private decalMaterial: THREE.MeshStandardMaterial | undefined;
  private decalMesh: THREE.Mesh | undefined;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  private rotationAngleX = 0; // Inicjalny kąt obrotu wokół osi Y
  private rotationAngleY = 0; // Inicjalny kąt obrotu wokół osi Y

  /**
   *Animate the ball
   *
   * @private
   * @memberof BallComponent
   */
  private animateBall() {
    if (this.ball && this.decalMesh) {
      const amplitude = 10; // Amplituda ruchu (ilość stopni)
      const frequency = 0.02; // Częstotliwość ruchu

      const time = performance.now() * 0.03; // Aktualny czas
      const rotationX = amplitude * Math.sin(frequency * time);
      const rotationY = amplitude * Math.cos(frequency * time);

      this.ball.rotation.x = THREE.MathUtils.degToRad(rotationX);
      this.ball.rotation.y = THREE.MathUtils.degToRad(rotationY);
      this.decalMesh.rotation.x = THREE.MathUtils.degToRad(rotationX);
      this.decalMesh.rotation.y = THREE.MathUtils.degToRad(rotationY);
    }
  }

  /**
   * Create the scene
   *
   * @private
   * @memberof BallComponent
   */
  private createScene() {
    if (!this.ball || !this.decalMesh) return;

    //* Scene
    this.scene = new THREE.Scene();
    this.scene.add(this.ball);
    this.scene.add(this.decalMesh);

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
   * @memberof BallComponent
   */
  private startRenderingLoop() {
    if (!this.ball || !this.decalMesh) return;

    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      preserveDrawingBuffer: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    //Rotation
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableZoom = false;

    this.position = this.camera.position;
    controls.addEventListener('change', () => {
      this.position = this.camera.position; // Aktualna rotacja względem osi x
      this.cdRef.detectChanges();
    });

    let component: BallComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateBall();
      component.renderer.render(component.scene, component.camera);
    })();
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
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

    // this.decalMesh.scale.set(2.85, 2.85, 2.85);
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }
}
