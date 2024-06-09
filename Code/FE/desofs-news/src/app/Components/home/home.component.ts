import { Component } from '@angular/core';
import { News } from 'src/app/Models/news';
import { NewsService } from './../../Services/news.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  newsList:  News[] = [
    {
      id: 23445,
      title: 'Com ou sem impermeáveis, a chuva já está colada à pele dos festivaleiros do Primavera',
      content: 'Como já vai sendo tradição ano após ano, a chuva não deu tréguas aos festivaleiros do Primavera Sound Porto. Entre as milhares de pessoas que estão no Parque da Cidade para assistir aos concertos da 11.ª edição do festival, há quem venha equipado a rigor e quem fique ensopado. Tudo pela música.',
      creationDate: new Date(),
      writer: 'Pedro Granadeiro',
      status: 'aprovada',
      imageUrl: ['assets/images/PVS.png']
    },
    {
      id: 28989,
      title: 'Medalha de bronze. O sonho de criança de Liliana Cá é dedicado aos filhos',
      content: '"A dedicatória é para os meus filhos, que estão sempre a perguntar se vou viajar outra vez e quando volto. Eu adoro-os e dedico-lhes esta medalha", disse a atleta portuguesa.',
      creationDate: new Date(),
      writer: 'António Varela',
      status: 'aprovada',
      imageUrl: ['assets/images/Liliana.png']
    },
    {
      id: 2345553,
      title: 'HÁ UMA BEBIDA COM MAIS BENEFÍCIOS QUE A ÁGUA? PARECE QUE SIM',
      content: 'Há quem diga que sabe a pano sujo, a água que já esteve na boca de alguém, ou àquilo a que cheiram as patas de um cão com fungos. Exageros. A verdade é que esta bebida maravilha tem aminoácidos, peptídeos antimicrobianos, hidratos de carbono, enzimas, eletrólitos e vitamina C. Já sabe qual é?',
      creationDate: new Date(),
      writer: 'Madalena Haderer',
      status: 'aprovada',
      imageUrl: ['assets/images/drink.png']
    }
  ];

  loadingMoreNews: boolean = false;

  constructor(private newsService: NewsService) {}


  loadMoreNews() {
    this.loadingMoreNews = true; // Ativa o indicador de carregamento

    // Chama o método do serviço para buscar mais notícias
    this.newsService.getNewsList().subscribe(
      (moreNews: any[]) => {
        // Adiciona as novas notícias à lista existente
        this.newsList = [ ...moreNews];
        this.loadingMoreNews = false; // Desativa o indicador de carregamento
      },
      (error) => {
        console.error('Erro ao carregar mais notícias:', error);
        this.loadingMoreNews = false; // Desativa o indicador de carregamento em caso de erro
      }
    );
  }
}
