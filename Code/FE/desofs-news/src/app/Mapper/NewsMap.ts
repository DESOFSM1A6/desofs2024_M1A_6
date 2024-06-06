import { NewsDTO } from "../DTO/NewsDTO";
import { News } from "../Models/news";

export class NewsMap {

    public static toDTO(news: News): NewsDTO {
      return {
        id: news.id,
        title: news.title,
        content: news.content,
        creationDate: news.creationDate,
        writer: news.writer,
        status: news.status,
        imageUrl: news.imageUrl
      } as NewsDTO;
    }
  
    public static toViewModel(newsDTO: NewsDTO): News {
      return {
        id: newsDTO.id,
        title: newsDTO.title,
        content: newsDTO.content,
        creationDate: newsDTO.creationDate,
        writer: newsDTO.writer,
        status: newsDTO.status,
        imageUrl: newsDTO.imageUrl
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