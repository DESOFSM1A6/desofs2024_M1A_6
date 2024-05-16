import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WarehouseDTO } from '../DTO/WarehouseDTO';

import { WarehouseService } from './warehouse.service';


describe('WarehouseService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let warehouseService: WarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [WarehouseService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    warehouseService = TestBed.inject(WarehouseService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// WarehouseService method tests begin ///
  describe('#getWarehouses', () => {
    let expectedWarehouses: WarehouseDTO[];

    beforeEach(() => {
      warehouseService = TestBed.inject(WarehouseService);
      expectedWarehouses = [{ id: 'TE1', description: 'test1', latitude: 44.2, longitude: -42.2, altitude: -10, street: 'TestStreet', local: 'TestLocal', postalCode: "1111-111", country: 'Micronesia' },
      { id: 'TE2', description: 'test2', latitude: 24.2, longitude: -44.2, altitude: 40, street: 'TestStreet1', local: 'TestLocal1', postalCode: "1112-111", country: 'Tuvalu' }] as WarehouseDTO[];
    });

    it('should return expected warehouses (called once)', () => {
      warehouseService.getWarehouses().subscribe({
        next: warehouses => expect(warehouses)
          .withContext('should return expected warehouses')
          .toEqual(expectedWarehouses),
        error: fail
      });

      // WarehouseService should have made one request to GET warehouses from expected URL
      const req = httpTestingController.expectOne(warehouseService.warehouseUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock warehouses
      req.flush(expectedWarehouses);
    });

    it('should be OK returning no warehouses', () => {
      warehouseService.getWarehouses().subscribe({
        next: warehouses => expect(warehouses.length)
          .withContext('should have empty warehouses array')
          .toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(warehouseService.warehouseUrl);
      req.flush([]); // Respond with no warehouses
    });

  });

  describe('#createWarehouses', () => {
    let expectedWarehouse: WarehouseDTO = { id: 'TE1', description: 'test1', latitude: 44.2, longitude: -42.2, altitude: -10, street: 'TestStreet', local: 'TestLocal', postalCode: "1111-111", country: 'Micronesia' };

    beforeEach(() => {
      warehouseService = TestBed.inject(WarehouseService);
    });

    it('should return expected created warehouses (called once)', () => {
      warehouseService.createWarehouse(expectedWarehouse).subscribe({
        next: warehouses => expect(warehouses)
          .withContext('should return expected warehouses')
          .toEqual(expectedWarehouse),
        error: fail
      });

      // WarehouseService should have made one request to POST warehouses from expected URL
      const req = httpTestingController.expectOne(warehouseService.warehouseUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock warehouses
      req.flush(expectedWarehouse);
    });

    //TODO: probably should be a post test erroring out, but I really couldnt figure out.
  });
});
