import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpserviceService } from './services/httpservice.service';
import { ProductModalInerface } from './Modal/productModal';
import { map, Observable } from 'rxjs';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  myReactiveForm: FormGroup;
  productList: ProductModalInerface[] = [];
  Title: Observable<string> = this._myservice.productTitle();

  constructor(private _myservice: HttpserviceService) {
    this.myReactiveForm = new FormGroup({
      proid: new FormControl(''),
      proname: new FormControl(''),
      proprice: new FormControl(''),
    });
  }

  onSubmit(): void {
    const newProduct = this.myReactiveForm.value;
    this.productList.push(newProduct);
    this._myservice.postData(newProduct).subscribe();
  }

  getData() {
    this._myservice
      .getData()
      .pipe(
        map((response) => {
          const products: ProductModalInerface[] = [];
          for (const id in response) {
            if (response.hasOwnProperty(id)) {
              products.push({ userId: id, ...response[id] });
            }
          }
          return products;
        })
      )
      .subscribe((products) => {
        this.productList = products;
      });
  }

  ngOnInit(): void {
    this.getData();
  }

  onDelete(userId: any) {
    this._myservice.deleteData(userId).subscribe((val) => {
      console.log(val);
    });
    this.getData();
  }
}
