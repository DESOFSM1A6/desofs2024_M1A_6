import { Component, OnInit } from '@angular/core';
import { Warehouse } from "../../Models/warehouse";
import { Observable, of } from 'rxjs';
import { WarehouseService } from "../../Services/warehouse.service";
import { Location } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WarehouseMap } from 'src/app/Mapper/WarehouseMap';
import { MessageService } from 'src/app/Services/message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouses: Warehouse[] = [];

  lat_dir = ['N', 'S'];
  long_dir = ['E', 'O'];

  warehouseForm!: FormGroup;

  constructor(private warehouseService: WarehouseService,
    private location: Location,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.getWarehouses();

    this.warehouseForm = this.formBuilder.group({
      warehouseId: ['', [Validators.required, Validators.pattern("[A-Za-z0-9]{3}")]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      latitudeHrs: ['', [Validators.required, Validators.min(0), Validators.max(90)]],
      latitudeMins: ['', [Validators.required, Validators.min(0), Validators.max(60)]],
      latitudeDir: ['', Validators.required],
      longitudeHrs: ['', [Validators.required, Validators.min(0), Validators.max(180)]],
      longitudeMins: ['', [Validators.required, Validators.min(0), Validators.max(60)]],
      longitudeDir: ['', Validators.required],
      altitude: ['', [Validators.required, Validators.min(-450)]],
      street: ['', Validators.required],
      local: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern("([0-9]{4})-([0-9]{3})")]],
      country: ['', Validators.required]
    });
  }

  get warehouseId(): FormControl { return this.warehouseForm.get('warehouseId') as FormControl; }
  get description(): FormControl { return this.warehouseForm.get('description') as FormControl; }
  get latitudeHrs(): FormControl { return this.warehouseForm.get('latitudeHrs') as FormControl; }
  get latitudeMins(): FormControl { return this.warehouseForm.get('latitudeMins') as FormControl; }
  get latitudeDir(): FormControl { return this.warehouseForm.get('latitudeDir') as FormControl; }
  get longitudeHrs(): FormControl { return this.warehouseForm.get('longitudeHrs') as FormControl; }
  get longitudeMins(): FormControl { return this.warehouseForm.get('longitudeMins') as FormControl; }
  get longitudeDir(): FormControl { return this.warehouseForm.get('longitudeDir') as FormControl; }
  get altitude(): FormControl { return this.warehouseForm.get('altitude') as FormControl; }
  get street(): FormControl { return this.warehouseForm.get('street') as FormControl; }
  get local(): FormControl { return this.warehouseForm.get('local') as FormControl; }
  get postalCode(): FormControl { return this.warehouseForm.get('postalCode') as FormControl; }
  get country(): FormControl { return this.warehouseForm.get('country') as FormControl; }

  getWarehouses(): void {
    this.warehouseService.getWarehouses()
      .subscribe(warehouses => this.warehouses = WarehouseMap.toViewModelList(warehouses));

  }

  createWarehouse(warehouseId: string, description: string, latitude: number, longitude: number, altitude: number, street: string, local: string, postalCode: string, country: string) {
    const warehouse: Warehouse = { id: warehouseId, description: description, latitude: latitude, longitude: longitude, altitude: altitude, street: street, local: local, postalCode: postalCode, country: country };
    this.warehouseService.createWarehouse(warehouse)
      .subscribe({
        complete: () => {
          this.getWarehouses()
          this.warehouseForm.reset()
        },
        error: (error: HttpErrorResponse) => {
          this.log(error.message);
        }
      });
  }

  onSubmit() {
    let lat = WarehouseComponent.convertLatLong(this.latitudeHrs.value, this.latitudeMins.value, this.latitudeDir.value);
    let long = WarehouseComponent.convertLatLong(this.longitudeHrs.value, this.longitudeMins.value, this.longitudeDir.value);

    this.createWarehouse(this.warehouseId.value, this.description.value, lat, long, this.altitude.value, this.street.value, this.local.value, this.postalCode.value, this.country.value);
  }

  static convertLatLong(hrs: number, mins: number, dir: string): number
  {
    let result = (hrs + (mins / 60))

    if (dir === "S" || dir === "O")
    {
      result = -result;
    }
    return result
  }


  goBack(): void {
    this.location.back();
  }

  /** Log a WarehouseService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`Warehouse: ${message}`);
  }

}
