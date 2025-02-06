import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpserviceService } from './services/httpservice.service';
import { ProductModalInerface } from './Modal/productModal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  productList: ProductModalInerface[] = [];
  expression: boolean = true;
  proTitle: Observable<any> = this.myservice.fetchproductTitle();
  @ViewChild('proid') proid: ElementRef;
  @ViewChild('proname') proname: ElementRef;
  @ViewChild('proprice') proprice: ElementRef;
  editMode: boolean = false;
  indexNumber: number;

  constructor(private myservice: HttpserviceService) {}

  onClick(proid: string, proname: string, proprice: string) {
    if (this.editMode) {
      this.productList[this.indexNumber] = {
        proid,
        proname,
        proprice,
      };
    } else {
      this.productList.push({
        proid,
        proname,
        proprice,
      });
    }
    this.proid.nativeElement.value = '';
    this.proname.nativeElement.value = '';
    this.proprice.nativeElement.value = '';
    this.saveData();
  }

  saveData() {
    this.myservice.submitData(this.productList).subscribe((data) => {
      console.log(data);
    });
  }

  onDelete(val) {
    this.productList.splice(val, 1);
    this.saveData();
  }

  fetchData() {
    this.myservice.fetchData().subscribe(
      (data) => {
        this.productList = data;
        this.expression = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.fetchData();
  }

  onEdit(i: any) {
    console.log(this.productList[i]);
    this.indexNumber = i;
    this.proid.nativeElement.value = this.productList[i].proid;
    this.proname.nativeElement.value = this.productList[i].proname;
    this.proprice.nativeElement.value = this.productList[i].proprice;
    this.editMode = true;
  }
}
