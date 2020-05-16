import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.page.html',
  styleUrls: ['./product-update.page.scss'],
})
export class ProductUpdatePage implements OnInit {

  constructor(private router: Router) { }
  updateProduct() {

    this.router.navigateByUrl('/product');
  }
  ngOnInit() {
  }

}
