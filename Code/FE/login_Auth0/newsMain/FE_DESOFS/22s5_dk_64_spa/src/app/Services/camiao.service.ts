import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { Camiao } from '../Models/camiao';
import { config } from '../config';
import { catchError, map, tap } from 'rxjs/operators';
import { CamiaoDTO } from '../DTO/CamiaoDTO';


@Injectable({
  providedIn: 'root'
})
export class CamiaoService {

  public camiaoUrl = `${config.mdlApiUrl}/Camiao`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getCamioes(): Observable<CamiaoDTO[]> {

    return this.http.get<CamiaoDTO[]>(this.camiaoUrl)
      .pipe(
        tap(_ => this.log('fetched camiao')),
        catchError(this.handleError<Camiao[]>('getCamioes', []))
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

  /** Log a CamiaoService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CamiaoService: ${message}`);
  }

  createCamiao(caracteristica: string, tara: number, capacidadeMassa: number, capacidadekWh: number, autonomia: number, tempoCarregamento: number): Observable<CamiaoDTO> {
    const camiao : CamiaoDTO = {caracteristica: caracteristica,tara:tara,capacidadeMassa:capacidadeMassa,capacidadekWh:capacidadekWh,autonomia:autonomia,tempoCarregamento:tempoCarregamento};
    return this.http.post<CamiaoDTO>(this.camiaoUrl, camiao, this.httpOptions).pipe(
      tap((newCamiaoDTO: CamiaoDTO) => this.log(`added camiao w/ caracteristica=${newCamiaoDTO.caracteristica}`)),
      catchError(this.handleError<CamiaoDTO>('addCamiao'))
    );
  }

}
