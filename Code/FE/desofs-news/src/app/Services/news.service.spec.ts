import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';
import { NewsDTO } from '../DTO/NewsDTO';

describe('NewsService', () => {
  let service: NewsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [NewsService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(NewsService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  
  describe('#getNews', () => {
    let expectedNews: NewsDTO[];

    beforeEach(() => {
      service = TestBed.inject(NewsService);
      expectedNews = [
        {title: 'Novo estilo de Jose Castelo Branco de listras pretas e brancas ',content:'José Castelo Branco foi detido esta terça-feira por suspeita de violência doméstica contra a mulher, Betty Grafstein. O socialite terá sido detido pela GNR, com um mandado emitido pelo DIAP de Sintra, para ser presente a primeiro interrogatório judicial para aplicação de medidas de coação.',creationDate:new Date(2024,5,7),writer:'Ana Cacho Paula'},
        {title: 'Minecraft: pequena atualização Tatu 1.20.5 pode ditar o futuro do jogo',content:'A atualização 1.20.5 do Minecraft está a trazer o simpático tatu na sua versão mini, algo que pode abrir as portas para uma tendência empolgante.',creationDate:new Date(2024,5,7),writer:'Jacinto Dores Aquino Rego'},
        {title: 'Chico da Tina este sábado na Quinta da Atalaia',content:'A Quinta da Atalaia, em Amora, abre as suas portas este sábado ao concerto de Chico da Tina, o ponto alto deste Março Jovem SXL, que traz ainda ao palco bandas das escolas secundárias do concelho e o DJ Suchi para encerrar este grande espetáculo. A entrada é livre.',creationDate:new Date(2024,5,7),writer:'Josefo Dias'},
     ] as NewsDTO[];
    });

    it('should return expected newsDTO (called once)', () => {
      service.getNewsList().subscribe({
        next: newsList => expect(newsList)
          .withContext('should return expected camioes')
          .toEqual(expectedNews),
        error: fail
      });

      // CamiaoService should have made one request to GET news from expected URL
      const req = httpTestingController.expectOne(service.newsUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock news
      req.flush(expectedNews);
    });

    it('should be OK returning no News', () => {
      service.getNewsList().subscribe({
        next: newsList => expect(newsList.length)
          .withContext('should have empty news array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(service.newsUrl);
      req.flush([]); // Respond with no news
    });

  });
});
