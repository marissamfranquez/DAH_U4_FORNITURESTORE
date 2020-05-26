import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  constructor(private router: Router) { }

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


}
