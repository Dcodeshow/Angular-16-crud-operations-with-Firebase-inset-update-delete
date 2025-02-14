import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModalInerface } from '../Modal/productModal';

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  url: string = 'https://crudoperation-c1c14-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  postData(productData: ProductModalInerface[]): Observable<any> {
    return this.http.post<ProductModalInerface>(
      `${this.url}/product.json`,
      productData
    );
  }

  getData(): Observable<any> {
    return this.http.get<ProductModalInerface>(`${this.url}/product.json`);
  }

  productTitle(): Observable<string> {
    return this.http.get<string>(`${this.url}/productTitle.json`);
  }

  deleteData(userID: any): Observable<any> {
    return this.http.delete<ProductModalInerface>(
      `${this.url}/product/${userID}.json`
    );
  }

  editData(userID: any, updatedProduct): Observable<any> {
    return this.http.put<ProductModalInerface>(
      `${this.url}/product/${userID}.json`,
      updatedProduct
    );
  }
}
