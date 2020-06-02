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
// tslint:disable-next-line: component-class-suffix
export class NewProductPage implements OnInit {

  public myform: FormGroup;
  public product: FornitureStore;

  constructor(private fb: FormBuilder, private service: FornitureStoreService, private router: Router) {
    this.initForm();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.myform = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      price: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+.[0-9]{2}')])],
      material: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      size: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      color: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      image: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      slider1: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      slider2: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      slider3: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      slider4: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });
  }
  newProduct() {
    if (!this.myform.valid) {
      this.service.showMessageAlert('Alerta', 'Campos llenados incorrectamente');
      return;

    } else {
      this.product = {
        name: this.myform.controls.name.value,
        price: this.myform.controls.price.value,
        material: this.myform.controls.material.value,
        size: this.myform.controls.size.value,
        color: this.myform.controls.color.value,
        image: this.myform.controls.image.value,
        slider1: this.myform.controls.slider1.value,
        slider2: this.myform.controls.slider2.value,
        slider3: this.myform.controls.slider3.value,
        slider4: this.myform.controls.slider4.value
      };
      this.service.saveProduct(this.product)

        .then(() => {
          this.myform.get('name').setValue('');
          this.myform.get('price').setValue('');
          this.myform.get('material').setValue('');
          this.myform.get('size').setValue('');
          this.myform.get('color').setValue('');
          this.myform.get('image').setValue('');
          this.myform.get('slider1').setValue('');
          this.myform.get('slider2').setValue('');
          this.myform.get('slider3').setValue('');
          this.myform.get('slider4').setValue('');
        })
        .catch(() => {
          this.service.showMessageAlert('Alerta', 'Error');
        });
      this.router.navigateByUrl('/product');

    }
  }
}
