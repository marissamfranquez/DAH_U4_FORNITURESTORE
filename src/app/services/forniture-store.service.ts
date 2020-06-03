import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FornitureStore } from '../models/forniture-store';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FornitureStoreService {
  public static userExist = false;

  constructor(private alertController: AlertController, public fAuth: AngularFireAuth,
              private router: Router, private firestore: AngularFirestore,
              private toast: ToastController) { }

  OnRegister(email: string, password: string){
    this.fAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.goTo('/product');
      })
      .catch(() => {
        this.showMessageAlert('Alerta', 'No se puede ingresar, verifique sus ingresos en correo o contraseña');
        this.goTo('/product');
      });
  }

  signOut() {
    this.fAuth.signOut()
      .then(() => {
        this.presentToast('Has cerrado sesión');
      })
      .catch(() => {
        console.log('error');
      });
  }

  Auth() {
    this.fAuth.onAuthStateChanged((user) => {
      if (user) {
        this.goTo('/product');
        FornitureStoreService.userExist = true;
      } else {
        FornitureStoreService.userExist = false;
      }
    });
  }

  onlyEventAuth() {
    this.fAuth.onAuthStateChanged((user) => {
      if (user) {
        FornitureStoreService.userExist = true;
      } else {
        FornitureStoreService.userExist = false;
      }
    });
  }

  goTo(traslado: string) {
    this.router.navigate([traslado]);
  }

  async showMessageAlert(titleAlert: string, messageAlert: string) {
    const alert = await this.alertController.create({
      header: titleAlert,
      message: messageAlert,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async presentToast(m: string) {
    const t = await this.toast.create({
      message: m,
      duration: 2000
    });
    t.present();
  }

  saveProduct(product: FornitureStore) {
    return this.firestore.collection('products').add(product);
  }

  saveProductWithId(id: string, product: FornitureStore) {
    return this.firestore.collection('products').doc(id).set(product);
  }

  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  updateProducts(product: FornitureStore, id: string) {
    this.firestore.doc('products/' + id).update(product);
  }

  deleteProducts(id: string) {
    this.firestore.doc('products/' + id).delete();
  }
}
