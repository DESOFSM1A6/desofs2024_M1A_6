import { Component } from '@angular/core';
import { CamiaoMap } from 'src/app/Mapper/CamiaoMap';
import { Camiao } from 'src/app/Models/camiao';
import { CamiaoService } from 'src/app/Services/camiao.service';


@Component({
  selector: 'app-camiao',
  templateUrl: './camiao.component.html',
  styleUrls: ['./camiao.component.css']
})
export class CamiaoComponent  {
  camioes: Camiao[] = [];

  constructor(
    private camiaoService: CamiaoService
    
    ){}

  ngOnInit(): void {
    this.getCamioes();
  }

  getCamioes(): void{
    this.camiaoService.getCamioes().subscribe(camioes => this.camioes = CamiaoMap.toViewModelList(camioes));
    /* const CAMIOES : Camiao[] = [
      {caracteristica: 'CamiaoBravissimo',tara:10000,capacidadeMassa:5000,capacidadekWh:80,autonomia:100,tempoCarregamento:60},
      {caracteristica: 'CamiaoVitoria',tara:10000,capacidadeMassa:5000,capacidadekWh:80,autonomia:100,tempoCarregamento:60},
      {caracteristica: 'RicTruck',tara:10000,capacidadeMassa:5000,capacidadekWh:80,autonomia:100,tempoCarregamento:60},
      {caracteristica: 'LoneStar',tara:100000,capacidadeMassa:50000,capacidadekWh:800,autonomia:1000,tempoCarregamento:70},
      {caracteristica: 'FH16 750',tara:12000,capacidadeMassa:9000,capacidadekWh:100,autonomia:200,tempoCarregamento:55},
      {caracteristica: 'Tesla Semi',tara:19000,capacidadeMassa:10000,capacidadekWh:300,autonomia:300,tempoCarregamento:65}
    ]
    this.camioes = CAMIOES; */
  }

  createCamiao(caracteristica: string, tara: number, capacidadeMassa: number, capacidadekWh: number, autonomia: number, tempoCarregamento: number){
    this.camiaoService.createCamiao(caracteristica, tara, capacidadeMassa, capacidadekWh,autonomia, tempoCarregamento).subscribe(camiao => {
      this.camioes.push(camiao);
    });
  }

}
