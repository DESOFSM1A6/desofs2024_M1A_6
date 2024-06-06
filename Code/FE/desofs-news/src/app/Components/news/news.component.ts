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
  

}
