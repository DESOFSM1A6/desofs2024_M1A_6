import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { config } from '../config';
import { catchError, map, tap } from 'rxjs/operators';
import { NewsDTO } from '../DTO/NewsDTO';
import { News } from '../Models/news';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public newsUrl = `${config.backend}/News`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

     // Método para obter as notícias
  getNewsList(): Observable<NewsDTO[]> {
    console.log("link cam: "+this.newsUrl);

    return this.http.get<NewsDTO[]>(this.newsUrl)
      .pipe(
        tap(_ => this.log('fetched news')),
        catchError(this.handleError<News[]>('getNews', []))
      );

  }

  // Atualiza o método createNews para aceitar FormData
  createNews(newsData: FormData): Observable<NewsDTO> {
    return this.http.post<NewsDTO>(this.newsUrl, newsData).pipe(
      tap((newNewsDTO: NewsDTO) => this.log(`added news w/ title=${newNewsDTO.title}`)),
      catchError(this.handleError<NewsDTO>('addNews'))
    );
  }

  getPendingNewsList(): Observable<NewsDTO[]> {
    return this.http.get<NewsDTO[]>(`${this.newsUrl}/pending`)
      .pipe(
        catchError(this.handleError<NewsDTO[]>('getPendingNewsList', []))
      );
  }

  approveNews(newsId: number): Observable<any> {
    return this.http.post(`${this.newsUrl}/approve/${newsId}`, {})
      .pipe(
        catchError(this.handleError<any>('approveNews'))
      );
  }

  rejectNews(newsId: number): Observable<any> {
    return this.http.post(`${this.newsUrl}/reject/${newsId}`, {})
      .pipe(
        catchError(this.handleError<any>('rejectNews'))
      );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
    /** Log a NewsService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`NewsService: ${message}`);
    }

}
