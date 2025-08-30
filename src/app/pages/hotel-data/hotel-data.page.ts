import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-hotel-data',
  templateUrl: './hotel-data.page.html',
  styleUrls: ['./hotel-data.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HotelDataPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
