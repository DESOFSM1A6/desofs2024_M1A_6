export class Warehouse {

    constructor(
      public id: string,
      public description: string,
      public latitude: number,
      public longitude: number,
      public altitude: number,
      public street: string,
      public local: string,
      public postalCode: string,
      public country: string,
    ) { }
  }