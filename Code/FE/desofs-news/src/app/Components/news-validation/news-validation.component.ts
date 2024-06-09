import { Component, OnInit } from '@angular/core';
import { NewsService } from './../../Services/news.service';
import { NewsDTO } from './../../DTO/NewsDTO';

@Component({
  selector: 'app-news-validation',
  templateUrl: './news-validation.component.html',
  styleUrls: ['./news-validation.component.css']
})
export class NewsValidationComponent implements OnInit {
  newsList: NewsDTO[] = [];
  feedbackMessage: string = '';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNewsList();
  }

  getNewsList(): void {
    this.newsService.getPendingNewsList().subscribe(
      newsList => {
        this.newsList = newsList;
      },
      error => {
        this.feedbackMessage = 'Erro ao carregar notícias pendentes.';
        console.error(error);
      }
    );
  }

  approveNews(newsId: number): void {
    if (confirm('Você tem certeza que deseja aprovar esta notícia?')) {
      this.newsService.approveNews(newsId).subscribe(
        response => {
          this.updateNewsStatus(newsId, 'approved');
          this.newsList = this.newsList.filter(news => news.id !== newsId);
          this.feedbackMessage = 'Notícia aprovada com sucesso.';
        },
        error => {
          this.feedbackMessage = 'Erro ao aprovar notícia.';
          console.error(error);
        }
      );
    }
  }

  rejectNews(newsId: number): void {
    if (confirm('Você tem certeza que deseja rejeitar esta notícia?')) {
      this.newsService.rejectNews(newsId).subscribe(
        response => {
          this.updateNewsStatus(newsId, 'rejected');
          this.newsList = this.newsList.filter(news => news.id !== newsId);
          this.feedbackMessage = 'Notícia rejeitada com sucesso.';
        },
        error => {
          this.feedbackMessage = 'Erro ao rejeitar notícia.';
          console.error(error);
        }
      );
    }
  }

  private updateNewsStatus(newsId: number, status: string): void {
    const news = this.newsList.find(news => news.id === newsId);
    if (news) {
      news.status = status;
    }
  }
}
