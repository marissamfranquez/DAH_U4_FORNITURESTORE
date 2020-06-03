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
  sliders: Array<string> = Array();

  constructor(private fb: FormBuilder, private service: FornitureStoreService, private router: Router) {
    this.initForm();
  }

  ngOnInit() { }

  initForm() {
    this.myform = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      price: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+.[0-9]{2}')])],
      material: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      size: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      color: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      haveGalery: [false],
      sliderForm: [''],
      image: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });
  }
  newProduct() {
    if (!this.myform.valid) {
      this.service.showMessageAlert('Alerta', 'Campos llenados incorrectamente');
      return;

    } else {
      if (this.sliders.length > 0 && this.myform.get('haveGalery').value as boolean) {
        this.product = {
          name: this.myform.controls.name.value,
          price: this.myform.controls.price.value,
          material: this.myform.controls.material.value,
          size: this.myform.controls.size.value,
          color: this.myform.controls.color.value,
          image: this.myform.controls.image.value,
          sliders: this.sliders
        };
    }
    else {
      this.product = {
        name: this.myform.controls.name.value,
        price: this.myform.controls.price.value,
        material: this.myform.controls.material.value,
        size: this.myform.controls.size.value,
        color: this.myform.controls.color.value,
        image: this.myform.controls.image.value
      };
    }

      this.service.saveProduct(this.product)
        .then(() => {
          this.myform.get('name').setValue('');
          this.myform.get('price').setValue('');
          this.myform.get('material').setValue('');
          this.myform.get('size').setValue('');
          this.myform.get('color').setValue('');
          this.myform.get('image').setValue('');
          this.myform.get('sliderForm').setValue('');
          this.myform.get('haveGalery').setValue(false);
          this.sliders = new Array();
        })
        .catch(() => {
          this.service.showMessageAlert('Alerta', 'Error');
        });
      this.router.navigateByUrl('/product');
    }
  }

  addSlider() {
    const slider = this.myform.get('sliderForm').value;
    if (slider !== '') {
      this.sliders.push(slider);
      this.myform.get('sliderForm').setValue('');
    }
  }

  errorSlider(): boolean {
    return this.sliders.length === 0 && this.myform.get('haveGalery').value;
  }

  errorSlider2(): boolean {
    return this.sliders.length > 0 && !this.myform.get('haveGalery').value;
  }

  deleteSlider(i: number) {
    const slidersT = Array();
    let indice = 0;
    for (const ing of this.sliders) {
      if (indice !== i) {
        slidersT.push(ing);
      }
      indice++;
    }
    this.sliders = slidersT;
  }

}
