import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { Warehouse } from '../Models/warehouse';
import { config } from '../config';
import { catchError, map, tap } from 'rxjs/operators';
import { WarehouseMap } from '../Mapper/WarehouseMap';
import { WarehouseDTO } from '../DTO/WarehouseDTO';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  public warehouseUrl = `${config.mdaApiUrl}/Warehouses`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getWarehouses(): Observable<WarehouseDTO[]> {

    return this.http.get<WarehouseDTO[]>(this.warehouseUrl)
      .pipe(
        tap(_ => this.log('fetched warehouse')),
        catchError(this.handleError<WarehouseDTO[]>('getWarehouse', []))
      )
  }

  createWarehouse(warehouse: Warehouse): Observable<WarehouseDTO> {

    let warehouseDTO: WarehouseDTO = WarehouseMap.toDTO(warehouse);

    /** POST: add a new warehouse to the server */
    return this.http.post<WarehouseDTO>(this.warehouseUrl, warehouseDTO, this.httpOptions).pipe(
      tap((warehouseDTO: WarehouseDTO) => this.log(`added warehouse w/ id=${warehouse.id}`)),
      //catchError(this.handleError<WarehouseDTO>('addWarehouse'))
      
    )
  }

   verifyIfExists(warehouseID: string): Observable<boolean>{
    const url = `${this.warehouseUrl}/${warehouseID}`;
    this.http.get<WarehouseDTO>(url,{observe : 'response'}).subscribe(response =>{
      
      if(response.status == 200){
        return of(true);
      } else {
        if(response.status == 404){
          this.log(`O armazém com ID = ${warehouseID} não existe.`)
        }
        
        return of(false);
      }
    })
    return of(false);
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

  /** Log a WarehouseService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`WarehouseService: ${message}`);
  }

}

