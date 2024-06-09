import { NewsService } from './../../Services/news.service';

import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/Models/news';
import { NewsMap } from 'src/app/Mapper/NewsMap';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit  {
  newsList: News[] = [
    {
      id: 1,
      title: 'Pesquisadores descobrem nova espécie de borboleta na Amazônia',
      content: 'Uma equipe de pesquisadores descobriu uma nova espécie de borboleta na região da Amazônia. A nova espécie, batizada de "Morpho amazonica", possui características únicas e é uma adição emocionante para a biodiversidade da região.',
      creationDate: new Date(),
      writer: 'Ana Silva',
      status: 'aprovada',
      imageUrl: ['assets/images/PVS.png'] // Nome do arquivo da imagem na pasta assets/images
    },
    {
      id: 2,
      title: 'Estudo revela impacto das mudanças climáticas na agricultura global',
      content: 'Um estudo abrangente sobre as mudanças climáticas revelou que a produção agrícola global está em risco devido aos efeitos do aquecimento global. O aumento das temperaturas e as alterações nos padrões de chuva estão causando sérios problemas para os agricultores em todo o mundo.',
      creationDate: new Date(),
      writer: 'Carlos Santos',
      status: 'pendente',
      imageUrl: ['assets/images/PVS.png'] // Nome do arquivo da imagem na pasta assets/images
    },
    {
      id: 3,
      title: 'Nova vacina contra a malária alcança resultados promissores em ensaios clínicos',
      content: 'Uma nova vacina experimental contra a malária mostrou resultados promissores em ensaios clínicos. A vacina, desenvolvida por uma equipe de cientistas internacionais, demonstrou uma eficácia significativa na prevenção da malária em áreas de alto risco, trazendo esperança para milhões de pessoas afetadas pela doença.',
      creationDate: new Date(),
      writer: 'Mariana Costa',
      status: 'aprovada',
      imageUrl: ['assets/images/PVS.png'] // Nome do arquivo da imagem na pasta assets/images
    }
  ];

  constructor(
    private newsService: NewsService
    
    ){}

  ngOnInit(): void {
    this.getNewsList();
  }

  getNewsList(): void{
     this.newsService.getNewsList().subscribe(newsList => {
      this.newsList = NewsMap.toViewModelList(newsList);
    });
  }
}
