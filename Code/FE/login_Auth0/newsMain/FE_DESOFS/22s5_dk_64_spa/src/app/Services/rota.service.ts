import { config } from './../config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { MessageService } from './message.service';

import { catchError, map, tap } from 'rxjs/operators';
import { RotaDTO } from '../DTO/RotaDTO';

@Injectable({
  providedIn: 'root'
})
export class RotaService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

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

  /** Log a CamiaoService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CamiaoService: ${message}`);
  }

  getRota(data : string): Observable<RotaDTO> {
    const requestURL =  `${config.mdlApiUrl}/Rota/${data}`
    return this.http.get<RotaDTO>(requestURL)
      .pipe(
        tap(_ => this.log('fetched camiao')),
        catchError(this.handleError<RotaDTO>('getRota', ))
      );
  }

}
