import * as THREE from 'three';
import { groundData } from '../default_data';

export class Ground {

    object!: THREE.Group;
    loaded: boolean = false;

    constructor() {

        this.object = new THREE.Group;

        const texture = new THREE.TextureLoader().load(groundData.groundURL);

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set(64, 64);

        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        const geometry = new THREE.PlaneGeometry(groundData.height, groundData.width);
        const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, map: texture });

        let ground = new THREE.Mesh(geometry, material);
        ground.rotation.z = Math.PI / 2.0;

        ground.castShadow = false;
        ground.receiveShadow = true;
        ground.position.set(0, 0, -0.1);

        this.object.add(ground);
        this.loaded = true;
    }
}