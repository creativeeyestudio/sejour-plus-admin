import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonButton, IonButtons, IonModal, IonInput, IonTextarea } from '@ionic/angular/standalone';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  standalone: true,
  imports: [IonTextarea, IonInput, IonModal, IonButtons, IonButton, IonItem, IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ServicesPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.modal.dismiss(null, 'cancel');
  }

}
