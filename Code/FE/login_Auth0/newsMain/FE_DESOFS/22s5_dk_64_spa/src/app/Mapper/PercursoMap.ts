import { PercursoDTO } from "../DTO/PercursoDTO";
import { Percurso } from "../Models/percurso";

export class PercursoMap {

    public static toDTO(percurso: Percurso): PercursoDTO {
      return {
        whPartida: percurso.whPartida,
        whChegada: percurso.whChegada,
        distancia: percurso.distancia,
        tempoComCargaMaX: percurso.tempoComCargaMaX,
        energiaGastaComCargaMax: percurso.energiaGastaComCargaMax,
      } as PercursoDTO;
    }
  
    public static toViewModel(percursoDTO: PercursoDTO): Percurso {
      return {
        whPartida: percursoDTO.whPartida,
        whChegada: percursoDTO.whChegada,
        distancia: percursoDTO.distancia,
        tempoComCargaMaX: percursoDTO.tempoComCargaMaX,
        energiaGastaComCargaMax: percursoDTO.energiaGastaComCargaMax,
      } as Percurso;
    }
  
    public static toViewModelList( percursoDTO: PercursoDTO[]): Percurso[] {
      var listPercurso: PercursoDTO[];
      listPercurso=[];
      percursoDTO.forEach(element => {
        listPercurso.push(PercursoMap.toViewModel(element))
      });
  
      return listPercurso;
    }
  }