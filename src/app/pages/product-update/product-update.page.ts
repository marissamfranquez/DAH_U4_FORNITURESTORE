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

  constructor(private router: Router, private service: FornitureStoreService,
              private actroute: ActivatedRoute, private formBuilder: FormBuilder) {
                this.initForm();
                this.actroute.queryParams.subscribe(
                  params => {
                    if (params && params.special){
                      this.product = JSON.parse(params.special) as FornitureStore;
                      console.log(this.product);
                    }
                  }
                );


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
      name: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+.[0-9]{2}')])],
      material: ['', Validators.compose([Validators.required])],
      size: ['', Validators.compose([Validators.required])],
      color: ['', Validators.compose([Validators.required])],
      image: ['', Validators.compose([Validators.required])],
      haveGalery: [false],
      sliderForm: ['']
    });
    this.sliders = new Array();
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
