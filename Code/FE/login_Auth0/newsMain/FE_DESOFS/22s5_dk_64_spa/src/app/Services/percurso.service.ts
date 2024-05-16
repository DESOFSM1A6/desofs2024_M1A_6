import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { config } from '../config';
import { catchError, map, tap } from 'rxjs/operators';
import { PercursoDTO } from '../DTO/PercursoDTO';


@Injectable({
  providedIn: 'root'
})
export class PercursoService {

  public percursoUrl = `${config.mdlApiUrl}/Percurso`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getPercursos(): Observable<PercursoDTO[]> {

    return this.http.get<PercursoDTO[]>(this.percursoUrl)
      .pipe(
        tap(_ => this.log('fetched percurso')),
        catchError(this.handleError<PercursoDTO[]>('getPercurso', []))
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

  /** Log a PercursoService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PercursoService: ${message}`);
  }

  createPercurso(whPartida: string, whChegada: string, distancia: number, tempoComCargaMaX: number, energiaGastaComCargaMax: number): Observable<PercursoDTO> {
    const percurso: PercursoDTO = { whPartida: whPartida, whChegada: whChegada, distancia: distancia, tempoComCargaMaX: tempoComCargaMaX, energiaGastaComCargaMax: energiaGastaComCargaMax };

    return this.http.post<PercursoDTO>(this.percursoUrl, percurso, this.httpOptions).pipe(
      tap((newPercurso: PercursoDTO) => this.log(`added percurso w/ Armazem partida=${newPercurso.whPartida} and Armazem chegada=${newPercurso.whChegada}`)),
      catchError(this.handleError<PercursoDTO>('addPercurso'))
    );

  }

}
