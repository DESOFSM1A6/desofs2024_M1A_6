import { NewsDTO } from "../DTO/NewsDTO";
import { News } from "../Models/news";

export class NewsMap {

    public static toDTO(news: News): NewsDTO {
      return {
        title: news.title,
        content: news.content,
        creationDate: news.creationDate,
        writer: news.writer
      } as NewsDTO;
    }
  
    public static toViewModel(newsDTO: NewsDTO): News {
      return {
        title: newsDTO.title,
        content: newsDTO.content,
        creationDate: newsDTO.creationDate,
        writer: newsDTO.writer
      } as News;
    }
  
    public static toViewModelList( newsDTO: NewsDTO[]): News[] {
      var listNews: News[];
      listNews=[];
      newsDTO.forEach(element => {
        listNews.push(NewsMap.toViewModel(element))
      });
  
      return listNews;
    }
  }