import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemModalPage } from './item-modal.page';

describe('ItemModalPage', () => {
  let component: ItemModalPage;
  let fixture: ComponentFixture<ItemModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
