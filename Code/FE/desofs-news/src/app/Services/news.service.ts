import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { config } from '../config';
import { NewsDTO } from '../DTO/NewsDTO';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public newsUrl = `${config.backend}/news`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    // Atualiza o método createNews para aceitar FormData
  createNews(newsData: NewsDTO): Observable<NewsDTO> {
    console.log(newsData);
    return this.http.post<NewsDTO>(this.newsUrl, newsData).pipe(
      tap((newNewsDTO: NewsDTO) => this.log(`added news w/ title=${newsData.title}`)),
      catchError(this.handleError<NewsDTO>('addNews'))
    );
  }

     // Método para obter as notícias
  getNewsList(): Observable<any> {
    console.log("link cam: "+this.newsUrl);

    this.http.get<any>(this.newsUrl).subscribe(
      (data) => {
        console.log(data);
      }
    );
    return this.http.get<any>(this.newsUrl)
      .pipe(
        tap(_ => this.log('fetched news')),
        //logs the response in the console
        catchError(this.handleError('getNewsList', []))
      );
  }

  getPendingNewsList(): Observable<NewsDTO[]> {
    return this.http.get<NewsDTO[]>(`${this.newsUrl}/pending`)
      .pipe(
        catchError(this.handleError<NewsDTO[]>('getPendingNewsList', []))
      );
  }

  approveNews(newsId: number): Observable<any> {
    return this.http.put(`${this.newsUrl}/approve/${newsId}`, {})
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
      const now = new Date();
      const timestamp = now.toLocaleString();


      this.log(`${operation} failed at ${timestamp}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
    /** Log a NewsService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`NewsService: ${message}`);
    }

}
