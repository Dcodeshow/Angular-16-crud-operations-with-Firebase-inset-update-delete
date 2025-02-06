import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModalInerface } from '../Modal/productModal';

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  constructor(private http: HttpClient) {}

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json/nawaz',
  });

  url: string = 'https://crudoperation-c1c14-default-rtdb.firebaseio.com/';

  submitData(productData: ProductModalInerface[]): Observable<any> {
    return this.http.put(`${this.url}products.json`, productData, {
      headers: this.header,
    });
  }

  fetchData(): Observable<any> {
    return this.http.get(`${this.url}products.json`);
  }

  fetchproductTitle(): Observable<any> {
    return this.http.get(`${this.url}productTitle.json`);
  }
}
