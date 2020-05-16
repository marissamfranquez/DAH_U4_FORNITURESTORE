import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(private router: Router) {}

  signIn() {

    this.router.navigateByUrl('/product');
}

}
