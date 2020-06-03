import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FornitureStoreService } from '../../services/forniture-store.service';
import { FornitureStore } from '../../models/forniture-store';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class ProductDetailPage implements OnInit {
  areVisibleButtons = false;
  product: FornitureStore;
  userExist = false;

  constructor(private router: Router, private service: FornitureStoreService,
              private actroute: ActivatedRoute, private toast: ToastController) {
                this.actroute.queryParams.subscribe(
                  params => {
                    if (params && params.special){
                      this.product = JSON.parse(params.special) as FornitureStore;
                      console.log(this.product);
                    }
                  }
                );
                this.service.onlyEventAuth();
                this.startTimer();
  }

  updateProduct() {
    this.router.navigateByUrl('/product-update');
  }

  startTimer() {
    setInterval(() => {
      if (this.userExist !== FornitureStoreService.userExist) {
        this.userExist = FornitureStoreService.userExist;
        this.areVisibleButtons = this.userExist;
      }
    }, 500);
  }

  ngOnInit() { }

  delete(id: string){
    this.service.deleteProducts(id);
    this.presentToast();
    this.router.navigate(['/product']);
  }

  async presentToast(){
    const t = await this.toast.create({
      message: 'Producto eliminado',
      duration: 2000
    });
    t.present();
  }

  detailProduct(product: FornitureStore) {
    const navext: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(product)
      }
    };
    this.router.navigate(['/product-update'], navext);
  }

}
