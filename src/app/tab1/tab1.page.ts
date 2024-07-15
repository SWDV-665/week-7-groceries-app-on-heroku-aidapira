import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = 'Grocery';

  items = [
    {
      name: 'Milk',
      quantity: 2
    },
    {
      name: 'Bread',
      quantity: 1
    },
    {
      name: 'Banana',
      quantity: 3
    },
    {
      name: 'Sugar',
      quantity: 1
    },
  ]
  constructor(public toastCtrl: ToastController) { }

  async removeItem(item: any, index: any) {
    console.log("Removing item -- ", item)
    const toast = await this.toastCtrl.create({
      message: "Removing item - " + item.name + "...",
      duration: 3000
    });
    toast.present();

    this.items.splice(index, 1)
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
        this.items.push(item)
      }
    }];
  public alertInputs = [
    {
      name: 'name',
      placeholder: 'Name',
    },
    {
      name: 'quantity',
      type: 'number',
      placeholder: 'Quantity',
    },
  ];
}
