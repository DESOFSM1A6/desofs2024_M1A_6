export class CamiaoDTO {

    constructor(
      public caracteristica: string,
      public tara: number,
      public capacidadeMassa: number,
      public capacidadekWh: number,
      public autonomia: number,
      public tempoCarregamento: number,
    ) { }
  }