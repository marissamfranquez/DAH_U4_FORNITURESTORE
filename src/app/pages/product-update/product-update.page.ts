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
}

  updateProduct() {
    this.product.name = this.myForm.get('name').value;
    this.product.price = this.myForm.get('price').value;
    this.product.material = this.myForm.get('material').value;
    this.product.size = this.myForm.get('size').value;
    this.product.color = this.myForm.get('color').value;
    this.product.image = this.myForm.get('image').value;
    this.service.updateProducts(this.product, this.product.id);
    this.initForm(); // clear fields
    this.router.navigateByUrl('/product');
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      material: ['', Validators.compose([Validators.required])],
      size: ['', Validators.compose([Validators.required])],
      color: ['', Validators.compose([Validators.required])],
      image: ['', Validators.compose([Validators.required])]
    });
  }

}
