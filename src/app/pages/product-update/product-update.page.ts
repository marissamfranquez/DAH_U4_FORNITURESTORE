import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FornitureStoreService } from '../../services/forniture-store.service';
import { FornitureStore } from '../../models/forniture-store';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.page.html',
  styleUrls: ['./product-update.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class ProductUpdatePage implements OnInit {
  product: FornitureStore;
  myForm: FormGroup;
  sliders: Array<string> = Array();
  interval = setInterval(() => {
              if (this.product !== undefined) {
                this.myForm.get('name').setValue(this.product.name);
                this.myForm.get('price').setValue(this.product.price);
                this.myForm.get('material').setValue(this.product.material);
                this.myForm.get('size').setValue(this.product.size);
                this.myForm.get('color').setValue(this.product.color);
                this.myForm.get('image').setValue(this.product.image);
                this.stopTimer();
              }
  }, 300);

  constructor(private router: Router, private service: FornitureStoreService,
              private actroute: ActivatedRoute, private formBuilder: FormBuilder) {
                this.actroute.queryParams.subscribe(
                  params => {
                    if (params && params.special){
                      this.product = JSON.parse(params.special) as FornitureStore;
                      console.log(this.product);
                    }
                  }
                );
                this.initForm();
  }

  updateProduct() {
    const id = this.product.id;
    const name = this.myForm.get('name').value;
    const price = this.myForm.get('price').value;
    const material = this.myForm.get('material').value;
    const size = this.myForm.get('size').value;
    const color = this.myForm.get('color').value;
    const image = this.myForm.get('image').value;
    const sliders = this.sliders;
    let productT;

    if (this.sliders.length > 0 && this.myForm.get('haveGalery').value) {
      productT = {
        name,
        price,
        material,
        size,
        color,
        image,
        sliders
      };
      this.service.updateProducts(productT, id);
    }
    else {
      productT = {
        name,
        price,
        material,
        size,
        color,
        image
      };
      this.service.saveProductWithId(id, productT);
    }

    this.initForm();
    this.router.navigateByUrl('/product');
  }

  ngOnInit() {
   if (this.product.sliders !== undefined) {
      this.myForm.get('haveGalery').setValue(true);
      this.sliders = this.product.sliders;
   } else {
      this.myForm.get('haveGalery').setValue(false);
   }
  }

  initForm() {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      price: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+[.][0-9]{2}|[0-9]+')])],
      material: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      size: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      color: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      image: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      haveGalery: [false],
      sliderForm: ['']
    });
    this.sliders = new Array();
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  addSlider() {
    const slider = this.myForm.get('sliderForm').value;
    if (slider !== '') {
      this.sliders.push(slider);
      this.myForm.get('sliderForm').setValue('');
    }
  }

  errorSlider(): boolean {
    return this.sliders.length === 0 && this.myForm.get('haveGalery').value;
  }

  errorSlider2(): boolean {
    return this.sliders.length > 0 && !this.myForm.get('haveGalery').value;
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
