import { CamiaoDTO } from "../DTO/CamiaoDTO";
import { Camiao } from "../Models/camiao";

export class CamiaoMap {

    public static toDTO(camiao: Camiao): CamiaoDTO {
      return {
        caracteristica: camiao.caracteristica,
        tara: camiao.tara,
        capacidadeMassa: camiao.capacidadeMassa,
        capacidadekWh: camiao.capacidadekWh,
        autonomia: camiao.autonomia,
        tempoCarregamento: camiao.tempoCarregamento,
      } as CamiaoDTO;
    }
  
    public static toViewModel(camiaoDTO: CamiaoDTO): Camiao {
      return {
        caracteristica: camiaoDTO.caracteristica,
        tara: camiaoDTO.tara,
        capacidadeMassa: camiaoDTO.capacidadeMassa,
        capacidadekWh: camiaoDTO.capacidadekWh,
        autonomia: camiaoDTO.autonomia,
        tempoCarregamento: camiaoDTO.tempoCarregamento,
      } as Camiao;
    }
  
    public static toViewModelList( camiaoDTO: CamiaoDTO[]): Camiao[] {
      var listCamiao: Camiao[];
      listCamiao=[];
      camiaoDTO.forEach(element => {
        listCamiao.push(CamiaoMap.toViewModel(element))
      });
  
      return listCamiao;
    }
  }