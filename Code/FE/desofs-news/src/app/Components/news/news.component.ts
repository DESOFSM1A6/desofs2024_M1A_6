import { NewsService } from './../../Services/news.service';

import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/Models/news';
import { NewsMap } from 'src/app/Mapper/CamiaoMap';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit  {
  newsList: News[] = [];

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
  /* FASE I 
  createNews(caracteristica: string, tara: number, capacidadeMassa: number, capacidadekWh: number, autonomia: number, tempoCarregamento: number){
    this.newsService.createNews(caracteristica, tara, capacidadeMassa, capacidadekWh,autonomia, tempoCarregamento).subscribe(camiao => {
      this.news.push(camiao);
    });
  }
  */

}
