export class DeliveryDTO {

  constructor(
    public id: string,
    public deliveryDate: Date,
    public deliveryMass: number,
    public timeToPutMin: number,
    public timeToTakeOffMin: number,
    public warehouseId: string,
  ) { }
}
