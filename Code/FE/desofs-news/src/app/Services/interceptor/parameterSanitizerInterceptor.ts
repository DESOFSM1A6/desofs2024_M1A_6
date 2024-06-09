import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ParameterSanitizerInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request has any query parameters
    if (req.params.keys().length) {
      const sanitizedParams = req.params.keys().reduce((accumulator, key) => {
        const values = req.params.getAll(key);
        if (values && values.length > 1) {
          // If multiple values are found, keep only the last one
          accumulator = accumulator.set(key, values[values.length - 1]);
        } else if (values) {
          // If only one value and it's not null, just set it normally
          accumulator = accumulator.set(key, values[0]);
        }
        return accumulator;
      }, new HttpParams());

      // Clone the request with sanitized query parameters
      const sanitizedRequest = req.clone({ params: sanitizedParams });
      return next.handle(sanitizedRequest);
    }

    // If no parameters, just forward the request
    return next.handle(req);
  }
}
