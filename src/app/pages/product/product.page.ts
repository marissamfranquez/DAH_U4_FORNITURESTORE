import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FornitureStoreService } from '../../services/forniture-store.service';
import { FornitureStore } from '../../models/forniture-store';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class ProductPage implements OnInit {
  isVisibleNewButton = false;
  isVisibleSigOutButton = false;
  isVisibleSigInButton = true;
  userExist = false;
  public product: FornitureStore[] = [];
  search: string;

  constructor(private router: Router, private service: FornitureStoreService, private route: ActivatedRoute,
              private alertController: AlertController) {
    this.getAll();
    this.startTimer();
    this.service.onlyEventAuth();
   }

  ngOnInit() { }

  startTimer() {
    setInterval(() => {
      if (this.userExist !== FornitureStoreService.userExist) {
        this.userExist = FornitureStoreService.userExist;
        if (this.userExist) {
          this.enableSigInButton(false);
          this.enableSigOutButton(true);
          this.enableNewButton(true);
        } else {
          this.enableSigInButton(true);
          this.enableSigOutButton(false);
          this.enableNewButton(false);
        }
      }
    }, 1000);
  }


  newProduct() {
    this.router.navigateByUrl('/new-product');
  }

  detailProduct(product: FornitureStore) {
    const navext: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(product)
      }
    };
    this.router.navigate(['/product-detail'], navext);
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

filter(){
  this.service.getProducts().subscribe(data => {
    this.product = data.map(e => {
      return {
        id: e.payload.doc.id,
        ... e.payload.doc.data() as any
      } as FornitureStore;
    }).filter((item: FornitureStore) =>
    item.name.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) > -1);
  });
}

 enableNewButton(enable: boolean) {
   this.isVisibleNewButton = enable;
 }

 enableSigInButton(enable: boolean) {
   this.isVisibleSigInButton = enable;
 }

 enableSigOutButton(enable: boolean) {
   this.isVisibleSigOutButton = enable;
 }

 async showMessageAlert(titleAlert: string, messageAlert: string) {
  const alert = await this.alertController.create({
    header: titleAlert,
    message: messageAlert,
    buttons: ['Aceptar']
  });
  await alert.present();
}
}
