import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PercursoDTO } from '../DTO/PercursoDTO';

import { PercursoService } from './percurso.service';


describe('PercursoService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let percursoService: PercursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [PercursoService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    percursoService = TestBed.inject(PercursoService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// PercursoService method tests begin ///
  describe('#getPercursos', () => {
    let expectedPercursos: PercursoDTO[];

    beforeEach(() => {
      percursoService = TestBed.inject(PercursoService);
      expectedPercursos = [{ whPartida: 'GA1', whChegada: 'GA2', distancia: 20, tempoComCargaMaX: 20, energiaGastaComCargaMax: 20},
      { whPartida: 'GA3', whChegada: 'GA4', distancia: 40, tempoComCargaMaX: 40, energiaGastaComCargaMax: 30}] as PercursoDTO[];
    });

    it('should return expected percursos (called once)', () => {
      percursoService.getPercursos().subscribe({
        next: percursos => expect(percursos)
          .withContext('should return expected percursos')
          .toEqual(expectedPercursos),
        error: fail
      });

      // PercursoService should have made one request to GET percursos from expected URL
      const req = httpTestingController.expectOne(percursoService.percursoUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock percursos
      req.flush(expectedPercursos);
    });

    it('should be OK returning no percursos', () => {
      percursoService.getPercursos().subscribe({
        next: percursos => expect(percursos.length)
          .withContext('should have empty percursos array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(percursoService.percursoUrl);
      req.flush([]); // Respond with no percursos
    });

  });

  describe('#createPercursos', () => {
    let expectedPercurso: PercursoDTO = { whPartida: 'GA1', whChegada: 'GA2', distancia: 20, tempoComCargaMaX: 20, energiaGastaComCargaMax: 20};

    beforeEach(() => {
      percursoService = TestBed.inject(PercursoService);
    });

    it('should return expected created percursos (called once)', () => {
      percursoService.createPercurso('GA1', 'GA2', 20, 20, 20).subscribe({
        next: percursos => expect(percursos)
          .withContext('should return expected percursos')
          .toEqual(expectedPercurso),
        error: fail
      });

      // PercursoService should have made one request to POST percursos from expected URL
      const req = httpTestingController.expectOne(percursoService.percursoUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock percursos
      req.flush(expectedPercurso);
    });

    //TODO: probably should be a post test erroring out, but I really couldnt figure out.
  });
});
