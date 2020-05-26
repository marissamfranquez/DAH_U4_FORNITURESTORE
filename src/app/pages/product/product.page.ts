import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FornitureStoreService } from '../../services/forniture-store.service';
import { FornitureStore } from '../../models/forniture-store';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  product: FornitureStore[];

  constructor(private router: Router, private service: FornitureStoreService) {
    this.service.getProducts().subscribe(data => {
      this.product = data.map(e => {
        return {
          id: e.payload.doc.id,
          ... e.payload.doc.data() as any
        } as FornitureStore;
      });
    });
   }
  ngOnInit() {
  }

  detailProduct(product: FornitureStore) {
    let navext: NavigationExtras = {
      queryParams:{
        special: JSON.stringify(product)
      }
    };
    this.router.navigate(['/product-detail'], navext);
  }
  update(product: FornitureStore){
    this.service.updateProducts(product, product.id);
  }

  newProduct() {
    this.router.navigateByUrl('/new-product');
  }
  login() {
    this.router.navigateByUrl('/home');
  }
  signOut() {
    this.service.signOut();
  }


}
