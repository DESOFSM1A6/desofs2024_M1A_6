import * as THREE from 'three';
import { GraphEdge } from '../graph/graph_edge';
import { GraphNode } from '../graph/graph_node';
import { connectionData, roundaboutData, streetData } from '../default_data';

export class Streets {

    object!: THREE.Group;
    loaded: boolean = false;

    constructor(nodes: GraphNode[], edges: GraphEdge[]) {

        this.object = new THREE.Group;
        let checks: Array<string> = [];

        const texture = new THREE.TextureLoader().load(streetData.streetURL);

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        const textureCon: THREE.Texture = texture.clone();
        textureCon.repeat.set(1, connectionData.textureRepeatDivisor);

        for (let node of nodes) {

            let warehouses: Array<string> = [];
            let connectionGroup: THREE.Group = new THREE.Group;
            let roadGroup: THREE.Group = new THREE.Group;

            for (let edge of edges) {

                // Sanity Checks
                // Verify 2-way connections.
                let targetNode: GraphNode | undefined = undefined;

                if (edge.whPartida == node.id && warehouses.find(looking => looking == edge.whChegada) == undefined) {
                    targetNode = nodes.find(node => node.id == edge.whChegada);
                    warehouses.push(edge.whChegada)
                }
                if (edge.whChegada == node.id && warehouses.find(looking => looking == edge.whPartida) == undefined) {
                    targetNode = nodes.find(node => node.id == edge.whPartida);
                    warehouses.push(edge.whPartida)
                }
                // Verify if it even exists to begin with. If not, skip.
                if (targetNode == undefined) {
                    continue;
                }
                // Verify if edge already exists.
                if (checks.find(check => check === node.id.concat(targetNode!.id)) !== undefined || checks.find(check => check === targetNode!.id.concat(node.id)) !== undefined) {
                    continue;
                }
                checks.push(node.id.concat(targetNode.id));
                // Sanity Checks End.

                // Model connections begin.
                let conLength = connectionData.k * (connectionData.width * roundaboutData.k / 2);
                let geometryConn: THREE.PlaneGeometry = new THREE.PlaneGeometry(connectionData.width, conLength, 30, 30);
                let materialConn: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: textureCon });

                let connection1: THREE.Mesh = new THREE.Mesh(geometryConn, materialConn);
                let connection2: THREE.Mesh = new THREE.Mesh(geometryConn, materialConn);
                connection1.receiveShadow = true;
                connection2.receiveShadow = true;

                let x: number = targetNode.x - node.x;
                let y: number = targetNode.y - node.y;

                let orientation: number = Math.atan2(y, x) + Math.PI / 2;

                connection1.position.set(node.x, node.y, node.z);
                connection1.rotateZ(orientation);
                connection1.translateY(conLength / 2 * -1)

                connection2.position.set(targetNode.x, targetNode.y, targetNode.z);
                connection2.rotateZ(orientation);
                connection2.translateY(conLength / 2)

                connectionGroup.add(connection1);
                connectionGroup.add(connection2);
                // Model connections end.

                // Model roads begin.
                let z: number = targetNode.z - node.z;

                let projection: number = Math.sqrt((Math.pow(x, 2)) + (Math.pow(y, 2))) - (conLength * 2);
                let roadLength: number = Math.sqrt(Math.pow(projection, 2) + Math.pow(z, 2));
                let incline: number = Math.atan2(z, projection) * -1;

                let textureRoad: THREE.Texture = texture.clone();
                textureRoad.repeat.set(1, roadLength / streetData.textureRepeatDivisor);

                let geometryRoad: THREE.PlaneGeometry = new THREE.PlaneGeometry(connectionData.width, roadLength, 30, 30);
                let materialRoad: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: textureRoad });

                let road: THREE.Mesh = new THREE.Mesh(geometryRoad, materialRoad);
                road.receiveShadow = true;

                road.position.set((node.x + targetNode.x) / 2, (node.y + targetNode.y) / 2, (node.z + targetNode.z) / 2);
                road.rotateZ(orientation);
                road.rotateX(incline);
                roadGroup.add(road);
                // Model roads end.

                this.object.add(connectionGroup);
                this.object.add(roadGroup);
            }
        }
        this.loaded = true;
    }
}