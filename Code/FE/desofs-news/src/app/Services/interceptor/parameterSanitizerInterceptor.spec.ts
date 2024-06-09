import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ParameterSanitizerInterceptor } from './parameterSanitizerInterceptor';

describe('ParameterSanitizerInterceptor', () => {
  let client: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ParameterSanitizerInterceptor,
          multi: true,
        },
      ],
    });

    client = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should keep only the last occurrence of each parameter', () => {
    client.get('/test', { params: { key: ['value1', 'value2'] } }).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(r => r.url === '/test');
    expect(req.request.params.get('key')).toEqual('value2');
    req.flush({ data: 'test' });
  });

  it('should pass parameters without duplication unchanged', () => {
    client.get('/test', { params: { key: 'value' } }).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(r => r.url === '/test');
    expect(req.request.params.get('key')).toEqual('value');
    req.flush({ data: 'test' });
  });
});
