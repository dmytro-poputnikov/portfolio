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
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-earth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './earth.component.html',
  styleUrls: ['./earth.component.scss'],
})
export class EarthComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasEarth')
  private canvasRef: ElementRef | undefined;

  public position: any;

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
  private async loadComputerGltf() {
    this.earth = await this.loaderGLTF.loadAsync(
      'assets/public/planet/scene.gltf'
    );
  }

  /**
   *Animate the earth
   *
   * @private
   * @memberof EarthComponent
   */
  private animateEarth() {
    if (this.earth) this.earth.scene.rotation.y += this.rotationSpeedX;
  }

  /**
   * Create the scene
   *
   * @private
   * @memberof EarthComponent
   */
  private async createScene() {
    await this.loadComputerGltf();

    if (!this.earth) return;
    this.earth.scene.scale.set(2.5, 2.5, 2.5);
    console.log(this.earth);
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
      preserveDrawingBuffer: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    //Rotation
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    // this.position = this.camera.position;
    // controls.addEventListener('change', () => {
    //   this.position = this.camera.position; // Aktualna rotacja względem osi x
    //   this.cdRef.detectChanges();
    // });

    let component: EarthComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateEarth();
      component.renderer.render(component.scene, component.camera);
    })();
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  async ngAfterViewInit() {
    console.log(this.canvas);
    await this.createScene();
    await this.startRenderingLoop();
  }
}
