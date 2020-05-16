import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  saveProduct() {

    this.router.navigateByUrl('/product');
}

}
