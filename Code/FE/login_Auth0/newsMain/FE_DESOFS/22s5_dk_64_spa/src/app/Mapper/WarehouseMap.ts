import { WarehouseDTO } from "../DTO/WarehouseDTO";
import { Warehouse } from "../Models/warehouse";

export class WarehouseMap {

    public static toDTO(warehouse: Warehouse): WarehouseDTO {
        return {
            id: warehouse.id,
            description: warehouse.description,
            latitude: warehouse.latitude,
            longitude: warehouse.longitude,
            altitude: warehouse.altitude,
            street: warehouse.street,
            local: warehouse.local,
            postalCode: warehouse.postalCode,
            country: warehouse.country,
        } as WarehouseDTO;
    }

    public static toViewModel(warehouseDTO: WarehouseDTO): Warehouse {
        return {
            id: warehouseDTO.id,
            description: warehouseDTO.description,
            latitude: warehouseDTO.latitude,
            longitude: warehouseDTO.longitude,
            altitude: warehouseDTO.altitude,
            street: warehouseDTO.street,
            local: warehouseDTO.local,
            postalCode: warehouseDTO.postalCode,
            country: warehouseDTO.country,
        } as Warehouse;
    }

    public static toViewModelList( warehouseDTOList: WarehouseDTO[]): Warehouse[] {
        var listWarehouse: Warehouse[];
        listWarehouse=[];
        warehouseDTOList.forEach(element => {
            listWarehouse.push(WarehouseMap.toViewModel(element))
        });
        
        return listWarehouse;
    }
}