import { Component, OnInit } from '@angular/core';
import {Delivery} from "../../Models/delivery";
import {DeliveryService} from "../../Services/delivery.service";
import {Warehouse} from "../../Models/warehouse";
import {WarehouseService} from "../../Services/warehouse.service";
import {MessageService} from "../../Services/message.service";
import {DeliveryMap} from "../../Mapper/DeliveryMap";

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  deliveries : Delivery[] = [];
  armazens: Warehouse[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private warehouseService: WarehouseService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getDeliveries();
    this.loadComboBox();
  }

  loadComboBox(): void {
    this.warehouseService.getWarehouses()
      .subscribe(armazens => this.armazens = armazens);
  }

  getDeliveries(): void {
    this.deliveryService.getDeliveries()
      .subscribe(deliveries => this.deliveries = DeliveryMap.toViewModelList(deliveries));
  }

  createDelivery(id: string, deliveryDate: Date, deliveryMass: number, timeToPutMin: number, timeToTakeOffMin: number, warehouseId: string){
    const delivery : Delivery = {id: id, deliveryDate: deliveryDate, deliveryMass: deliveryMass, timeToPutMin: timeToPutMin, timeToTakeOffMin: timeToTakeOffMin, warehouseId: warehouseId};
    this.deliveryService.createDelivery(delivery).subscribe(delivery => this.deliveries.push(delivery));
  }


}
