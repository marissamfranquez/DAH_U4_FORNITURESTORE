import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FornitureStoreService } from '../../services/forniture-store.service';
import { FornitureStore } from '../../models/forniture-store';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  myform: FormGroup;
  public model: FornitureStore;

  constructor(private fb: FormBuilder, private service: FornitureStoreService, private router: Router) { this.validate(); }

  ngOnInit() {
  }

  validate() {
    this.myform = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      price: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+.[0-9]{2}')])],
      material: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      size: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      color: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      image: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    });
  }
  newProduct() {

    if (!this.myform.valid) {
      this.service.showMessageAlert('Alerta', 'valores incorrectos');
      return;

    } else {
      this.model = {
        name: this.myform.controls.name.value,
        price: this.myform.controls.controlnumber.value,
        material: this.myform.controls.age.value,
        size: this.myform.controls.curp.value,
        color: this.myform.controls.active.value,
        image: this.myform.controls.active.value
      };
      this.service.saveProduct(this.model)

        .then(() => {
          this.myform.get('name').setValue('');
          this.myform.get('price').setValue('');
          this.myform.get('material').setValue('');
          this.myform.get('size').setValue('');
          this.myform.get('color').setValue('');
          this.myform.get('image').setValue('');
        })
        .catch(() => {
          this.service.showMessageAlert('Alerta', 'Error');
        });
      this.router.navigateByUrl('/product');

    }
  }
}
