
import { Component } from '@angular/core';
import { CamiaoMap } from 'src/app/Mapper/CamiaoMap';
import { News } from 'src/app/Models/news';
import { CamiaoService } from 'src/app/Services/camiao.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent  {
  newsList: News[] = [];

  constructor(
    // faseI private newsService: newsService
    
    ){}

  ngOnInit(): void {
    this.getNewsList();
  }

  getNewsList(): void{
    // faseI this.newsService.getNewsList().subscribe(newsList => this.newsList = NewsMap.toViewModelList(news));
     const NEWSLIST : News[] = [
      {title: 'Novo estilo de Jose Castelo Branco de listras pretas e brancas ',content:'José Castelo Branco foi detido esta terça-feira por suspeita de violência doméstica contra a mulher, Betty Grafstein. O socialite terá sido detido pela GNR, com um mandado emitido pelo DIAP de Sintra, para ser presente a primeiro interrogatório judicial para aplicação de medidas de coação.',creationDate:new Date(2024,5,7),writer:'Ana Cacho Paula'},
      {title: 'Minecraft: pequena atualização Tatu 1.20.5 pode ditar o futuro do jogo',content:'A atualização 1.20.5 do Minecraft está a trazer o simpático tatu na sua versão mini, algo que pode abrir as portas para uma tendência empolgante.',creationDate:new Date(2024,5,7),writer:'Jacinto Dores Aquino Rego'},
      {title: 'Chico da Tina este sábado na Quinta da Atalaia',content:'A Quinta da Atalaia, em Amora, abre as suas portas este sábado ao concerto de Chico da Tina, o ponto alto deste Março Jovem SXL, que traz ainda ao palco bandas das escolas secundárias do concelho e o DJ Suchi para encerrar este grande espetáculo. A entrada é livre.',creationDate:new Date(2024,5,7),writer:'Josefo Dias'},
   ]
    this.newsList = NEWSLIST; 
  }
  /* FASE I 
  createNews(caracteristica: string, tara: number, capacidadeMassa: number, capacidadekWh: number, autonomia: number, tempoCarregamento: number){
    this.newsService.createNews(caracteristica, tara, capacidadeMassa, capacidadekWh,autonomia, tempoCarregamento).subscribe(camiao => {
      this.news.push(camiao);
    });
  }
  */

}
