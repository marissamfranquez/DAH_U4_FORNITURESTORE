import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FornitureStoreService } from '../../services/forniture-store.service';
import { FornitureStore } from '../../models/forniture-store';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.page.html',
  styleUrls: ['./product-update.page.scss'],
})
export class ProductUpdatePage implements OnInit {
  product: FornitureStore;

  constructor(private router: Router, private service: FornitureStoreService,
    private actroute: ActivatedRoute) {
      this.actroute.queryParams.subscribe(
        params => {
          if (params && params.special){
            this.product = JSON.parse(params.special) as FornitureStore;
            console.log(this.product);
          }
        }
      );
}
  updateProduct(product: FornitureStore, name: string, price: string) {
    product.name = name;
    product.price = price;
    this.service.updateProducts(product, product.id);
    this.router.navigateByUrl('/product');
  }
  ngOnInit() {
  } 

}
