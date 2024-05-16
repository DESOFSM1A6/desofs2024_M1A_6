import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { GraphCreator } from './graph/graph_creator';
import { Roundabouts } from './scene_objects/roundabouts';
import { WarehouseModels } from './scene_objects/warehouses';
import { Streets } from './scene_objects/streets';
import { Ground } from './scene_objects/ground';
import { Skybox } from './scene_objects/skybox';


@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
})
export class VisualizationComponent implements OnInit, OnDestroy {

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private gridGround!: THREE.GridHelper;
  private roundabouts!: Roundabouts;
  private warehouses!: WarehouseModels;
  private streets!: Streets;
  private ground!: Ground;
  private skybox!: Skybox;

  constructor(
    private graphCreator: GraphCreator
  ) { }

  private createScene() {

    // Generate renderer.
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.shadowMap.enabled = true;

    // Generate scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    // Generate ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 3); // soft white light
    this.scene.add(ambientLight);

    // Generate hemisphere light
    const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(hemiLight);

    // Generate pointed lights for shadow generation.
    const pointLight1 = new THREE.PointLight(0xffffff, 0.5);
    pointLight1.position.set(-100, -100, 100);
    pointLight1.castShadow = true;

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
    pointLight2.position.set(100, -100, 100);
    pointLight2.castShadow = true;

    this.scene.add(pointLight1);
    this.scene.add(pointLight2);

    /*const cameraHelper = new THREE.CameraHelper(pointLight1.shadow.camera);
    const cameraHelper2 = new THREE.CameraHelper(pointLight2.shadow.camera);
    this.scene.add(cameraHelper);
    this.scene.add(cameraHelper2);
    */


    // Generate camera, position it and set y as up vector.
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 125, 125);
    this.camera.lookAt(0, 0, 0);
    this.camera.up.set(0, 0, 1);

    // Generate grid helper for positioning purposes.
    /* this.gridGround = new THREE.GridHelper(300, 60, 0x3f3f3f, 0x3f3f3f);
    this.gridGround.rotation.x = Math.PI / 2;
    this.scene.add(this.gridGround);
    */

    // Generate orbit controls. (i.e., pan, zoom, orbit)
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.graphCreator.generateGraph().subscribe(results => {
      this.graphCreator.buildNodes(results.warehouses);
      this.graphCreator.buildEdges(results.paths);
      this.streets = new Streets(this.graphCreator.nodes, this.graphCreator.edges);
      this.roundabouts = new Roundabouts(this.graphCreator.nodes);
      this.warehouses = new WarehouseModels(this.graphCreator.nodes);
      this.ground = new Ground();
      this.skybox = new Skybox();
      console.log(this.graphCreator.nodes);
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {

    this.createScene();
    this.startRenderingLoop();
  }

  private startRenderingLoop() {

    let component: VisualizationComponent = this;
    (function render() {

      requestAnimationFrame(render);

      if (component.roundabouts.loaded && component.streets.loaded && component.warehouses.loaded
        && component.ground.loaded && component.skybox.loaded) {
        component.scene.add(component.streets.object);
        component.scene.add(component.roundabouts.object);
        component.scene.add(component.warehouses.object);
        component.scene.add(component.ground.object);
        component.scene.add(component.skybox.object);
      }
      component.renderer.render(component.scene, component.camera);
    }());
  }

  ngOnDestroy() {

    (<HTMLCanvasElement>document.getElementById('canvas')).remove();
  }
}
