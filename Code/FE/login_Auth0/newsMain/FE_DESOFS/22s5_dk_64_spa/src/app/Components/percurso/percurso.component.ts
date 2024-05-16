import { Percurso } from './../../Models/percurso';
import { Component } from '@angular/core';
import { PercursoService } from 'src/app/Services/percurso.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';
import { MessageService } from 'src/app/Services/message.service';
import { Warehouse } from 'src/app/Models/warehouse';
import { PercursoMap } from 'src/app/Mapper/PercursoMap';
import { WarehouseMap } from 'src/app/Mapper/WarehouseMap';


@Component({
  selector: 'app-percurso',
  templateUrl: './percurso.component.html',
  styleUrls: ['./percurso.component.css']
})
export class PercursoComponent {
  percursos: Percurso[] = [];

  armazens: Warehouse[] = [];

  constructor(
    private percursoService: PercursoService,
    private warehouseService: WarehouseService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getPercursos();
    this.loadComboBox();
  }

  loadComboBox(): void {
    this.warehouseService.getWarehouses()
      .subscribe(armazens => this.armazens = WarehouseMap.toViewModelList(armazens));
  }

  getPercursos(): void {
    this.percursoService.getPercursos().subscribe(percursos => this.percursos = PercursoMap.toViewModelList(percursos));
  }

  private log(message: string) {
    this.messageService.add(`PercursoComponent: ${message}`);
  }

  createPercurso(whPartida: string, whChegada: string, distancia: number, tempoComCargaMaX: number, energiaGastaComCargaMax: number) {
    if(whPartida===whChegada){
      this.log("Não foi possível criar o percurso pois contém o mesmo armazém de partida e chegada.")
    } else {
      this.percursoService.createPercurso(whPartida, whChegada, distancia, tempoComCargaMaX, energiaGastaComCargaMax).subscribe(percurso => {
        this.percursos.push(PercursoMap.toViewModel(percurso));
      });
    }
    

  }



}
