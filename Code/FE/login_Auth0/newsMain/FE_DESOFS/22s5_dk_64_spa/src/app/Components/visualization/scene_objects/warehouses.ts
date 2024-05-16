import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { warehouseData } from '../default_data';
import { GraphNode } from '../graph/graph_node';

export class WarehouseModels {

    object!: THREE.Group;
    loaded: boolean = false;

    constructor(nodes: GraphNode[]) {

        this.object = new THREE.Group;
        const loader = new GLTFLoader();

        for (let node of nodes) {

            // Remove potential duplicates.
            if (this.object.children.filter(warehouse => warehouse.position === new THREE.Vector3(node.x, node.y, node.z + warehouseData.zDiff)).length > 0) { continue; }
            let rng = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

            if (rng < 4) {
                loader.load(
                    warehouseData.warehouse1URL,
                    (gltf) => { this.loadAndAddModel(gltf, node); }
                )
            } else if (rng >= 4 && rng < 7) {
                loader.load(
                    warehouseData.warehouse2URL,
                    (gltf) => { this.loadAndAddModel(gltf, node); }
                )
            } else {
                loader.load(
                    warehouseData.warehouse3URL,
                    (gltf) => { this.loadAndAddModel(gltf, node); }
                )
            }
        }
        this.loaded = true;
    }

    private loadAndAddModel(gltf: GLTF, node: GraphNode) {

        let model = gltf.scene;
        model.position.set(node.x, node.y, node.z + warehouseData.zDiff);
        model.rotation.x = Math.PI / 2;
        model.scale.set(warehouseData.scale, warehouseData.scale, warehouseData.scale);
        model.castShadow = true;
        model.receiveShadow = true;
        this.object.add(model);
    }
}