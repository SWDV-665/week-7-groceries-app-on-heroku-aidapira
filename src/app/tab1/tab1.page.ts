import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { GroceriesServiceService } from '../providers/groceries-service/groceries-service.service';
import { ItemModalPage } from '../item-modal/item-modal.page';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { GroceryModel } from '../providers/groceries-service/grocery.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('slidingItem') slidingItem: any;

  title = 'Grocery';
  items: GroceryModel[] = [];
  errorMessage: string = '';

  constructor(public toastCtrl: ToastController, private modalController: ModalController, public dataService: GroceriesServiceService, public socialSharing: SocialSharing) {
  }
  ngOnInit(): void {
    this.loadItems()
  }

  ionViewLoaded() {
    this.loadItems()
  }

  loadItems(): void {
    this.dataService.getItems()
      .subscribe({
        next: (items) => {
          this.items = items;
        },
        error: (error) => {
          this.errorMessage = <any>error
        }
      })
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

  async removeItem(id: string) {
    const toast = await this.toastCtrl.create({
      message: "Removing item - " + id + "...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(id)
    .subscribe({
      next: (item) => {
        console.log(item)
      },
      error: (error) => {
        this.errorMessage = <any>error
      }
    })
  }

  async editItem(item: GroceryModel) {
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
        this.dataService.editItem(result.data)
        .subscribe({
          next: (item) => {
            console.log(item)
          },
          error: (error) => {
            this.errorMessage = <any>error
          }
        })
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
        this.dataService.addItem(result.data)
        .subscribe({
          next: (item) => {
            console.log(item)
          },
          error: (error) => {
            this.errorMessage = <any>error
          }
        })
      }
    });

    await modal.present();
  }
}
