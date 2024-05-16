import {Delivery} from "../Models/delivery";
import {DeliveryDTO} from "../DTO/DeliveryDTO";

export class DeliveryMap {

  public static toDTO(delivery: Delivery): DeliveryDTO {
    return {
      id: delivery.id,
      deliveryDate: delivery.deliveryDate,
      deliveryMass: delivery.deliveryMass,
      timeToPutMin: delivery.timeToPutMin,
      timeToTakeOffMin: delivery.timeToTakeOffMin,
      warehouseId: delivery.warehouseId,
    } as DeliveryDTO;
  }

  public static toViewModel(deliveryDTO: DeliveryDTO): Delivery {
    return {
      id: deliveryDTO.id,
      deliveryDate: deliveryDTO.deliveryDate,
      deliveryMass: deliveryDTO.deliveryMass,
      timeToPutMin: deliveryDTO.timeToPutMin,
      timeToTakeOffMin: deliveryDTO.timeToTakeOffMin,
    warehouseId: deliveryDTO.warehouseId,
    } as Delivery;
  }

  public static toViewModelList( deliveryDTOList: DeliveryDTO[]): Delivery[] {
    var listDelivery: Delivery[];
    listDelivery=[];
    deliveryDTOList.forEach(element => {
      listDelivery.push(DeliveryMap.toViewModel(element))
    });

    return listDelivery;
  }
}
