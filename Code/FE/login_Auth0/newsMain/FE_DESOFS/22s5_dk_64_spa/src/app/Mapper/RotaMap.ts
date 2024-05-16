import { RotaDTO } from "../DTO/RotaDTO";
import { Rota } from "../Models/rota";

export class RotaMap {

    public static toDTO(rota: Rota): RotaDTO {
      return {
        paragens: Object.assign([], rota.paragens),
        tempo: rota.tempo,
      } as RotaDTO;
    }
  
    public static toViewModel(rotaDTO: RotaDTO): Rota {
      return {
        paragens: Object.assign([], rotaDTO.paragens),
        tempo: rotaDTO.tempo,
      } as Rota;
    }
  
    public static toViewModelList( camiaoDTO: RotaDTO[]): Rota[] {
      var listRota: Rota[];
      listRota=[];
      camiaoDTO.forEach(element => {
        listRota.push(RotaMap.toViewModel(element))
      });
  
      return listRota;
    }
  }