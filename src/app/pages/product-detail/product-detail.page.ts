import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FornitureStoreService } from '../../services/forniture-store.service';
import { FornitureStore } from '../../models/forniture-store';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

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

  updateProduct() {

    this.router.navigateByUrl('/product-update');
  }

  ngOnInit() {
  }

}
