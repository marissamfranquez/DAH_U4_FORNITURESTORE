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

  public product: FornitureStore[] = [];
  search: string;

  constructor(private router: Router, private service: FornitureStoreService) {
   this.getAll();
   
   }
  ngOnInit() {
  }
 
 

  newProduct() {
    this.router.navigateByUrl('/new-product');
  }

  detailProduct(product: FornitureStore) {
    let navext: NavigationExtras = {
      queryParams:{
        special: JSON.stringify(product)
      }
    };
    this.router.navigate(['/product-detail'],navext);
  }
  login() {
    this.router.navigateByUrl('/home');
  }
  signOut() {
    this.service.signOut();
  }

  getAll(): void {
    this.service.getProducts().subscribe(data => {
      this.product = data.map(e => {
        return {
          id: e.payload.doc.id,
          ... e.payload.doc.data() as any
        } as FornitureStore;
      });
    });

  }

  filter(): void{
   // this.getAll();
    if (this.search && this.search.trim()){
      this.product = this.product.filter((product) => {
        return (product.name.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) > -1);
      });
    }
  }
}