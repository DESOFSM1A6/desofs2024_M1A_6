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

  getNewsList(): Observable<NewsDTO[]> {
    console.log("link cam: "+this.newsUrl);

    return this.http.get<NewsDTO[]>(this.newsUrl)
      .pipe(
        tap(_ => this.log('fetched news')),
        catchError(this.handleError<News[]>('getNews', []))
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

  createNews(title: string, content: string, creationDate: Date, writer: string): Observable<NewsDTO> {
    const news: NewsDTO = { title: title, content: content, creationDate: creationDate, writer: writer};
    return this.http.post<NewsDTO>(this.newsUrl, news, this.httpOptions).pipe(
      tap((newNewsDTO: NewsDTO) => this.log(`added news w/ title=${newNewsDTO.title}`)),
      catchError(this.handleError<NewsDTO>('addNews'))
    );
  }


}
