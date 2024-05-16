import * as THREE from 'three';
import { skyboxData } from '../default_data';

export class Skybox {

    object!: THREE.Group;
    loaded: boolean = false;

    constructor() {

        this.object = new THREE.Group;
        let matArray: THREE.MeshBasicMaterial[] = [];

        const front = new THREE.TextureLoader().load(skyboxData.frontURL);
        const back = new THREE.TextureLoader().load(skyboxData.backURL);
        const up = new THREE.TextureLoader().load(skyboxData.upURL);
        const down = new THREE.TextureLoader().load(skyboxData.downURL);
        const right = new THREE.TextureLoader().load(skyboxData.rightURL);
        const left = new THREE.TextureLoader().load(skyboxData.leftURL);

        matArray.push(new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: front }));
        matArray.push(new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: back }));
        matArray.push(new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: up }));
        matArray.push(new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: down }));
        matArray.push(new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: right }));
        matArray.push(new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: left }));

        const geometry = new THREE.BoxGeometry(skyboxData.height, skyboxData.width, skyboxData.depth);
        const skybox = new THREE.Mesh(geometry, matArray);
        skybox.rotateX(Math.PI / 2);

        this.object.add(skybox);
        this.loaded = true;
    }
}