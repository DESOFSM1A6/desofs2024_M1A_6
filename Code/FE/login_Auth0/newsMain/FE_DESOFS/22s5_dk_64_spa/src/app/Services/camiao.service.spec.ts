import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CamiaoService } from './camiao.service';
import { CamiaoDTO } from '../DTO/CamiaoDTO';

describe('CamiaoService', () => {
  let service: CamiaoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [CamiaoService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CamiaoService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  
  describe('#getCamioes', () => {
    let expectedCamioes: CamiaoDTO[];

    beforeEach(() => {
      service = TestBed.inject(CamiaoService);
      expectedCamioes = [{ caracteristica: 'Urus Truck', tara: 20000, capacidadeMassa: 10000, capacidadekWh: 200, autonomia: 400, tempoCarregamento: 100 },
      { caracteristica: 'Lumus Truck', tara: 20000, capacidadeMassa: 10000, capacidadekWh: 200, autonomia: 400, tempoCarregamento: 100 }] as CamiaoDTO[];
    });

    it('should return expected camioes (called once)', () => {
      service.getCamioes().subscribe({
        next: camioes => expect(camioes)
          .withContext('should return expected camioes')
          .toEqual(expectedCamioes),
        error: fail
      });

      // CamiaoService should have made one request to GET camioes from expected URL
      const req = httpTestingController.expectOne(service.camiaoUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock camioes
      req.flush(expectedCamioes);
    });

    it('should be OK returning no camioes', () => {
      service.getCamioes().subscribe({
        next: camioes => expect(camioes.length)
          .withContext('should have empty camioes array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(service.camiaoUrl);
      req.flush([]); // Respond with no camioes
    });

  });
});
