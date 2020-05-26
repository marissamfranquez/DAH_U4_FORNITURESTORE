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

  product: FornitureStore[] = [];

  constructor(private router: Router, private firestore: FornitureStoreService) {
    this.firestore.getProducts().subscribe(data => {
      this.product = data.map(p => {
        return {
          id: p.payload.doc.id,
          name: p.payload.doc.get('name'),
          price: p.payload.doc.get('price'),
          material: p.payload.doc.get('material'),
          size: p.payload.doc.get('size'),
          color: p.payload.doc.get('color')
        } as FornitureStore;
      });
    });
   }
  ngOnInit() {
  }

  newProduct() {
    this.router.navigateByUrl('/new-product');
  }

  detailProduct() {
    this.router.navigateByUrl('/product-detail');
  }
  login() {
    this.router.navigateByUrl('/home');
  }
  signOut() {
    this.firestore.signOut();
  }


}
