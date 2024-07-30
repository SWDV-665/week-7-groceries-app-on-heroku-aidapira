import { Component, ViewChild } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { GroceriesServiceService } from '../providers/groceries-service/groceries-service.service';
import { ItemModalPage } from '../item-modal/item-modal.page';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('slidingItem') slidingItem: any;

  title = 'Grocery';

  constructor(public toastCtrl: ToastController, private modalController: ModalController, public dataService: GroceriesServiceService, public socialSharing: SocialSharing) { }

  loadItems() {
    return this.dataService.getItems();
  }

  async shareItem(item: any, index: any) {
    const toast = await this.toastCtrl.create({
      message: "Sharing item - " + item.name + "...",
      duration: 3000
    });
    toast.present();

    let message = "Grocery item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via grocery app"
    this.socialSharing.share(message, subject).then(() => {
      console.log('shared successfully')
    }).catch((error) => {
      console.log("Errored: " + error)
    });
  }

  async removeItem(item: any, index: any) {
    const toast = await this.toastCtrl.create({
      message: "Removing item - " + item.name + "...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  async editItem(item: any, index: any) {
    const toast = await this.toastCtrl.create({
      message: "Editting item - " + item.name + "...",
      duration: 3000
    });
    toast.present();

    const modal = await this.modalController.create({
      component: ItemModalPage,
      componentProps: { item: { ...item } }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.dataService.editItem(result.data, index);
        this.slidingItem.close();
      }
    });

    await modal.present();
  }

  async addItem() {
    const modal = await this.modalController.create({
      component: ItemModalPage,
      componentProps: { item: { name: '', quantity: '1' } }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.dataService.addItem(result.data);
      }
    });

    await modal.present();
  }
}
