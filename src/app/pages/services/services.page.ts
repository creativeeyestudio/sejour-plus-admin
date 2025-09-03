import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonButton, IonButtons, IonModal, IonInput, IonTextarea } from '@ionic/angular/standalone';
import { Service, ServicePayload, ServicesList } from 'src/app/interfaces/service';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  standalone: true,
  imports: [IonTextarea, IonInput, IonModal, IonButtons, IonButton, IonItem, IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ServicesPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  constructor(public api: Api, public fb: FormBuilder) {}

  services?: ServicesList;
  serviceToUpdate?: Service;

  serviceForm = this.fb.group({
    serviceName: ['', Validators.required],
    serviceDesc: ['', Validators.required],
  })

  ngOnInit() {
    this.initServicesList();
  }

  async initServicesList() {
    this.services = await this.api.getServices();
  }

  openModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss(null, 'cancel');
  }

  async onSubmitForm() {
    if (!this.serviceForm.valid) return;

    const rawValue = this.serviceForm.value;

    const payload: ServicePayload = {
      serviceName: rawValue.serviceName ?? '',
      serviceDesc: rawValue.serviceDesc ?? '',
      servicePos: 0
    };

    try {
      this.serviceToUpdate
        ? await this.api.updateService(payload, this.serviceToUpdate.id)
        : await this.api.createService(payload);

      await this.initServicesList();
      this.closeModal();
    } catch (error) {
      console.error(
        this.serviceToUpdate
          ? `Erreur lors de la mise à jour du service ID ${this.serviceToUpdate.id} :`
          : "Erreur lors de la création du service :", error
      );
    }
  }

  async updateService(id: number) {
    this.serviceToUpdate = await this.api.getService(id);
    this.serviceForm.patchValue(this.serviceToUpdate);
    this.openModal();
  }

  async deleteService(id: number) {
    try {
      await this.api.deleteService(id)
        .then(async () => await this.initServicesList());
    } catch (error) {
      console.error("Erreur lors de la suppression du service :", error);
    }
  }
}
