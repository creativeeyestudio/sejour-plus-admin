import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tourism',
  templateUrl: './tourism.page.html',
  styleUrls: ['./tourism.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TourismPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
