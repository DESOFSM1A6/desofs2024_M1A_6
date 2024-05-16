import { Component, OnInit } from '@angular/core';
import { RotaMap } from 'src/app/Mapper/RotaMap';
import { RotaService } from 'src/app/Services/rota.service';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.css']
})
export class RotaComponent implements OnInit {

  paragens: string[] = [];

  tempo : number = 0;

  constructor(
    private rotaSerice: RotaService
  ) { }

  ngOnInit(): void {
  }

  obterRota(data : string): void{
    this.rotaSerice.getRota(data).subscribe(rota => RotaMap.toViewModel(rota));
    
  }

}
