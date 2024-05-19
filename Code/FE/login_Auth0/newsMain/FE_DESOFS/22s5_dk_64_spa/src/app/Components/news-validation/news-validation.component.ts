import { Component,  OnInit } from '@angular/core';


@Component({
  selector: 'app-news-validation',
  imports: [],
  templateUrl: './news-validation.component.html',
  styleUrls: ['./news-validation.component.css']
})
export class NewsValidationComponent implements OnInit{
  newsList = [
    { id: 1, title: 'Notícia 1', content: 'Conteúdo da notícia 1...' },
    { id: 2, title: 'Notícia 2', content: 'Conteúdo da notícia 2...' },
    { id: 3, title: 'Notícia 2', content: 'Conteúdo da notícia 2...' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  approveNews(newsId: number): void {
    console.log('Notícia aprovada com ID:', newsId);
    this.newsList = this.newsList.filter(news => news.id !== newsId);
  }

  rejectNews(newsId: number): void {
    console.log('Notícia rejeitada com ID:', newsId);
    this.newsList = this.newsList.filter(news => news.id !== newsId);
  }
}
