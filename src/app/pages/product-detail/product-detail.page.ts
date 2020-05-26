import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FornitureStoreService } from '../../services/forniture-store.service';
import { FornitureStore } from '../../models/forniture-store';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  product: FornitureStore;

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
  }

  updateProduct() {

    this.router.navigateByUrl('/product-update');
  }

  ngOnInit() {
  }
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

}
