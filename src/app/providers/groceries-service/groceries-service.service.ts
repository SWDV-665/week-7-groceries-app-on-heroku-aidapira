import { Injectable } from '@angular/core';

interface Item {
  // Define the structure of your item here
  name: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {

  items: Item[] = []

  constructor() { }

  getItems() {
    return this.items
  }
 
  removeItem(index: any) {
    this.items.splice(index, 1)
  }

  addItem(item: any) {
    this.items.push(item)
  }

  editItem(item: any, index: any) {
    this.items[index] = item
  }
}
