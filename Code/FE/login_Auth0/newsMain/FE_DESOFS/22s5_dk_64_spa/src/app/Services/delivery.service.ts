import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Delivery} from "../Models/delivery";
import {MessageService} from "./message.service";
import {config} from "../config";
import {DeliveryDTO} from "../DTO/DeliveryDTO";
import {DeliveryMap} from "../Mapper/DeliveryMap";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  public deliveriesUrl = `${config.mdaApiUrl}/Delivery`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getDeliveries(): Observable<DeliveryDTO[]> {
    return this.http.get<DeliveryDTO[]>(this.deliveriesUrl)
      .pipe(
        tap(_ => this.log('fetched deliveries')),
        catchError(this.handleError<DeliveryDTO[]>('getDeliveries', []))
      );
  }

  createDelivery(delivery:Delivery): Observable<DeliveryDTO>{
    let deliveryDTO: DeliveryDTO = DeliveryMap.toDTO(delivery);
    return this.http.post<DeliveryDTO>(this.deliveriesUrl, deliveryDTO, this.httpOptions).pipe(
      tap((deliveryDto: DeliveryDTO) => this.log(`added delivery w/ id=${delivery.id}`)),
      )
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

  /** Log a DeliveryService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`DeliveryService: ${message}`);
  }
}
