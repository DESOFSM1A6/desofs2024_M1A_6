import { Injectable } from '@angular/core';

import { PercursoService } from 'src/app/Services/percurso.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';
import { GraphEdge } from './graph_edge';
import { GraphNode } from './graph_node';
import { Observable, forkJoin } from 'rxjs';
import { cartesianData } from '../default_data';
import { WarehouseMap } from 'src/app/Mapper/WarehouseMap';
import { WarehouseDTO } from 'src/app/DTO/WarehouseDTO';
import { Percurso } from 'src/app/Models/percurso';

@Injectable({
  providedIn: 'root'
})
export class GraphCreator {
  // Array que contém os Armazéns(nodes)
  nodes: GraphNode[] = [];
  // Array que contém os Percursos(edges)
  edges: GraphEdge[] = [];

  constructor(
    private warehouseService: WarehouseService,
    private percursoService: PercursoService,
  ) { }

  // Atualiza o Array nodes e o Array edges
  generateGraph(): Observable<any> {

    // Observable calls do not depend on eachother, but it is within our interest that they resolve simultaneously for loading purposes.
    return forkJoin({
      warehouses: this.warehouseService.getWarehouses(),
      paths: this.percursoService.getPercursos()
    });
  }

  buildNodes(warehousesDTO: WarehouseDTO[]): void {

    let warehouses = WarehouseMap.toViewModelList(warehousesDTO);
    // Geographical limitations.
    let longitudeLowerLimit = Math.min(...warehouses.map(warehouse => warehouse.longitude));
    let longitudeUpperLimit = Math.max(...warehouses.map(warehouse => warehouse.longitude))
    let latitudeLowerLimit = Math.min(...warehouses.map(warehouse => warehouse.latitude));
    let latitudeUpperLimit = Math.max(...warehouses.map(warehouse => warehouse.latitude));
    let altitudeLowerLimit = Math.min(...warehouses.map(warehouse => warehouse.altitude));
    let altitudeUpperLimit = Math.max(...warehouses.map(warehouse => warehouse.altitude));

    for (let warehouse of warehouses) {
      // Prevent duplicates from multiple refreshes of the page as this is a singleton provider.
      if (this.nodes.filter(node => node.id === warehouse.id).length > 0) { continue; }

      let x = this.geographicalToCartesian(warehouse.longitude, longitudeLowerLimit, longitudeUpperLimit, cartesianData.xLowerLimit, cartesianData.xUpperLimit);
      let y = this.geographicalToCartesian(warehouse.latitude, latitudeLowerLimit, latitudeUpperLimit, cartesianData.yLowerLimit, cartesianData.yUpperLimit);
      let z = this.geographicalToCartesian(warehouse.altitude, altitudeLowerLimit, altitudeUpperLimit, cartesianData.zLowerLimit, cartesianData.zUpperLimit);

      let node = new GraphNode(warehouse.id, warehouse.description, x, y, z);
      this.nodes.push(node);
    };
  }

  buildEdges(percursos: Percurso[]): void {

    for (let percurso of percursos) {
      // Prevent duplicates from multiple refreshes of the page as this is a singleton provider.
      if (this.edges.filter(edge => edge.whChegada === percurso.whChegada && edge.whPartida === percurso.whPartida).length > 0) { continue; }

      let edge = new GraphEdge(percurso.whPartida, percurso.whChegada, percurso.distancia);
      this.edges.push(edge);
    }
  }

  private geographicalToCartesian(coord: number, geoLowerLimit: number, geoUpperLimit: number, cartLowerLimit: number, cartUpperLimit: number): number {

    if (geoUpperLimit - geoLowerLimit === 0) { return 0; }
    return ((cartUpperLimit - cartLowerLimit) / (geoUpperLimit - geoLowerLimit)) * (coord - geoLowerLimit) + cartLowerLimit;
  }
}
