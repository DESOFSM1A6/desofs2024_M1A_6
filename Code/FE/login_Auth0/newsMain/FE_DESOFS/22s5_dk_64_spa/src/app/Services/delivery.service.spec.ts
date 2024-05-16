import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {DeliveryService} from "./delivery.service";
import {DeliveryDTO} from "../DTO/DeliveryDTO";


describe('DeliveryService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let deliveryService: DeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [DeliveryService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    deliveryService = TestBed.inject(DeliveryService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// DeliveryService method tests begin ///
  describe('#getDeliveries', () => {
    let expectedDeliveries: DeliveryDTO[];

    beforeEach(() => {
      deliveryService = TestBed.inject(DeliveryService);
      expectedDeliveries = [{ id: '1234', deliveryDate: new Date(2022, 12, 10), deliveryMass: 7, timeToPutMin: 5, timeToTakeOffMin: 4, warehouseId: 'GB4'},
        { id: '123', deliveryDate: new Date(2022, 12, 18), deliveryMass: 2, timeToPutMin: 2, timeToTakeOffMin: 1, warehouseId: 'GB5'}] as DeliveryDTO[];
    });

    it('should return expected deliveries (called once)', () => {
      deliveryService.getDeliveries().subscribe({
        next: deliveries => expect(deliveries)
          .withContext('should return expected deliveries')
          .toEqual(expectedDeliveries),
        error: fail
      });

      // PercursoService should have made one request to GET percursos from expected URL
      const req = httpTestingController.expectOne(deliveryService.deliveriesUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock percursos
      req.flush(expectedDeliveries);
    });

    it('should be OK returning no deliveries', () => {
      deliveryService.getDeliveries().subscribe({
        next: deliveries => expect(deliveries.length)
          .withContext('should have empty delieries array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(deliveryService.deliveriesUrl);
      req.flush([]); // Respond with no percursos
    });

  });

  describe('#createDelivery', () => {
    let expectedDelivery: DeliveryDTO = { id: '1234', deliveryDate: new Date(2022, 12, 10), deliveryMass: 7, timeToPutMin: 5, timeToTakeOffMin: 4, warehouseId: 'GB4'};

    beforeEach(() => {
      deliveryService = TestBed.inject(DeliveryService);
    });

    it('should return expected created deliveries (called once)', () => {
      let delivery: DeliveryDTO = { id: '1234', deliveryDate: new Date(2022, 12, 10), deliveryMass: 7, timeToPutMin: 5, timeToTakeOffMin: 4, warehouseId: 'GB4'};
      deliveryService.createDelivery(delivery).subscribe({
        next: deliveries => expect(deliveries)
          .withContext('should return expected deliveries')
          .toEqual(expectedDelivery),
        error: fail
      });

      // PercursoService should have made one request to POST percursos from expected URL
      const req = httpTestingController.expectOne(deliveryService.deliveriesUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock percursos
      req.flush(expectedDelivery);
    });

    //TODO: probably should be a post test erroring out, but I really couldnt figure out.
  });
});
