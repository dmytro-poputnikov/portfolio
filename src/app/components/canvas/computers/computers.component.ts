import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { LoaderComponent } from '../../loader/loader.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-computers-canvas',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComputersCanvasComponent implements OnInit, OnDestroy {
  @ViewChild('canvas')
  private canvasRef: ElementRef | undefined;

  public position: any;

  //* Cube Properties

  @Input() public rotationSpeedX: number = 0.0001;

  @Input() public rotationSpeedY: number = 0.0001;

  @Input() public size: number = 0.1;

  // @Input() public texture: string = '/assets/texture.jpg';

  //* Stage Properties
  @Input() public cameraX: number = 25;
  @Input() public cameraY: number = 1.5; //red
  @Input() public cameraZ: number = -0.1; //green
  @Input() public fieldOfView: number = 25;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  //? Helper Properties (Private Properties);

  mediaQuery = window.matchMedia('(max-width: 500px)');
  isMobile = this.mediaQuery.matches;

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   console.log('adasd');
  //   this.setSize();
  // }

  handleMediaQueryChange = (event: any) => {
    this.isMobile = event.matches;
  };

  private computer: GLTF | undefined;

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef!.nativeElement;
  }
  // private loaderTexture = new THREE.TextureLoader();
  private loaderGLTF = new GLTFLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  // private material = new THREE.MeshBasicMaterial({
  //   map: this.loaderTexture.load(this.texture),
  // });

  // private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  /**
   * Loader
   */
  private loadProgressSubject = new BehaviorSubject<number>(0);
  loadProgress$ = this.loadProgressSubject.asObservable();

  /**
   * Get computer gltf (Async function)
   * @private
   * @memberof
   */
  private async loadComputerGltf() {
    this.computer = await this.loaderGLTF.loadAsync(
      'assets/public/desktop_pc/scene.gltf',
      ({ loaded, total }) => {
        this.loadProgressSubject.next((loaded / total) * 100);
      }
    );
    // this.computer.scene.rotateZ(Math.PI / 2);
    // this.computer.scene.rotateY(Math.PI / 2);
    this.computer.scene.position.set(1, -3, -1.5);
    // this.computer.scene.rotateY(Math.PI);
    // this.computer.scene.rotateZ(Math.PI / 2);
  }

  /**
   *Animate the cube
   *
   * @private
   * @memberof ComputersCanvasComponent
   */
  private animateComputer() {
    if (this.computer) this.computer.scene.rotation.y -= this.rotationSpeedX;
    // this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
   * Create the scene
   *
   * @private
   * @memberof ComputersCanvasComponent
   */
  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
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

    //* Light
    const pointLight = new THREE.PointLight(0xffffff); // Kolor światła (biały)
    pointLight.position.x = -0.74;
    pointLight.position.y = 0.003;
    pointLight.position.z = -5.47;
    pointLight.intensity = 20;

    const spotLight = new THREE.SpotLight(0xffffff); // Kolor światła (biały)
    spotLight.position.set(-0.56, 2, 1.25);
    spotLight.angle = 40;
    spotLight.shadow.mapSize.width = 256;
    spotLight.shadow.mapSize.height = 256;
    spotLight.penumbra = 0.5;
    spotLight.intensity = 100;

    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // ambientLight.position.set(-2, 10, 4); // Położenie światła (x, y, z)
    // ambientLight.intensity = 2.5;

    const hemisphereLight = new THREE.HemisphereLight(0xffffff);
    hemisphereLight.position.set(-0.42, 6.6, -7.75); // Położenie światła (x, y, z)
    hemisphereLight.intensity = 1;
    hemisphereLight.groundColor = new THREE.Color(THREE.Color.NAMES.black);

    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(spotLight);
    this.scene.add(pointLight);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  setSize = () => {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();

    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  };

  /**
   * Start the rendering loop
   *
   * @private
   * @memberof ComputersCavnasComponent
   */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.setSize();

    //Rotation
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    this.position = this.camera.position;
    controls.addEventListener('change', () => {
      this.position = this.camera.position; // Aktualna rotacja względem osi x
      this.cdRef.detectChanges();
    });

    // Włącz obsługę cieni
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap; // Typ cieniowania

    let component: ComputersCanvasComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateComputer();
      component.renderer.render(component.scene, component.camera);
    })();
  }

  constructor(private cdRef: ChangeDetectorRef) {}
  ngOnDestroy(): void {
    //this.mediaQuery.removeEventListener('change', this.handleMediaQueryChange);
  }

  ngOnInit(): void {
    //this.mediaQuery.addEventListener('change', this.handleMediaQueryChange);
  }

  ngAfterViewInit() {
    this.createScene();

    // Dodaj załadowany model do sceny po jego załadowaniu
    this.loadComputerGltf().then(() => {
      if (this.computer) {
        this.scene.add(this.computer.scene);
      }
    });

    this.startRenderingLoop();
  }
}
