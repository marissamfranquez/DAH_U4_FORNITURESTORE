import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import {FornitureStoreService } from '../services/forniture-store.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

// tslint:disable-next-line: component-class-suffix
export class HomePage implements OnInit{

  public myform: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private firestore: FornitureStoreService) {
    this.firestore.Auth();
  }

  ngOnInit() {
    this.myform = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  signIn() {
    const email = this.myform.get('email').value;
    const password = this.myform.get('password').value;
    this.firestore.OnRegister(email, password);
  }

}
