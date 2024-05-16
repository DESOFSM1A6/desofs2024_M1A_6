import * as THREE from 'three';
import { roundaboutData, connectionData } from '../default_data';
import { GraphNode } from '../graph/graph_node';

export class Roundabouts {

    object!: THREE.Group;
    loaded: boolean = false;

    constructor(nodes: GraphNode[]) {

        this.object = new THREE.Group;

        const texture = new THREE.TextureLoader().load(roundaboutData.roundaboutURL);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        const material = new THREE.MeshBasicMaterial({ color: roundaboutData.color, side: THREE.DoubleSide, map: texture });

        for (let node of nodes) {

            let geometry = new THREE.CircleGeometry(connectionData.width * roundaboutData.k / 2, roundaboutData.segments);

            // Remove potential duplicates.
            if (this.object.children.filter(round => round.position === new THREE.Vector3(node.x, node.y, node.z + roundaboutData.infinitesimal)).length > 0) { continue; }

            let roundabout = new THREE.Mesh(geometry, material);
            roundabout.position.set(node.x, node.y, node.z + roundaboutData.infinitesimal);

            roundabout.castShadow = true;
            roundabout.receiveShadow = true;

            this.object.add(roundabout);
        }
        this.loaded = true;
    }
}