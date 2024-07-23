import { Component, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { GroceriesServiceService } from '../providers/groceries-service/groceries-service.service';

interface EditAlertInput {
  name: string;
  type?: 'text' | 'number' | 'password' | 'email' | 'tel' | 'url' | 'date' | 'time';
  placeholder: string;
  value: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('slidingItem') slidingItem: any;

  title = 'Grocery';

  editAlertInputs: EditAlertInput[] = [];
  constructor(public toastCtrl: ToastController, private alertController: AlertController, public dataService: GroceriesServiceService) { }

  loadItems() {
    return this.dataService.getItems()
  }

  async removeItem(item: any, index: any) {
    console.log("Removing item -- ", item)
    const toast = await this.toastCtrl.create({
      message: "Removing item - " + item.name + "...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index)    
  }

  async editItem(item: any, index: any, slidingItem: any) {
    console.log("Editting item -- ", item)
    const toast = await this.toastCtrl.create({
      message: "Editting item - " + item.name + "...",
      duration: 3000
    });
    toast.present();

    // Prepare editAlertInputs based on the item being edited
    this.editAlertInputs = [
      {
        name: 'name',
        placeholder: 'Name',
        value: item.name
      },
      {
        name: 'quantity',
        type: 'number',
        placeholder: 'Quantity',
        value: item.quantity.toString()
      }
    ];

    // Open the edit-item-alert
    const alert = await this.alertController.create({
      header: 'Please edit item',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: (item) => {
            this.dataService.editItem(item, index)
            slidingItem.close();
          }
        }
      ],
      inputs: this.editAlertInputs
    });

    await alert.present();
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Save',
      handler: (item: any) => {
        this.dataService.addItem(item)
      }
    }];
  public alertInputs = [
    {
      name: 'name',
      placeholder: 'Name',
    },
    {
      name: 'quantity',
      type: 'select',
      placeholder: 'Quantity',
    },
  ];
}
