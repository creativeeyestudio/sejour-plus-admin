import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelDataPage } from './hotel-data.page';

describe('HotelDataPage', () => {
  let component: HotelDataPage;
  let fixture: ComponentFixture<HotelDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
