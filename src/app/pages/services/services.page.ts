import { Component, inject, OnInit, ViewChild } from '@angular/core';
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

  services?: ServicesList;
  serviceToUpdate?: Service;
  formSubmitLabel?: string = "Créer l'activité";
  private fb = inject(FormBuilder);

  serviceForm = this.fb.group({
    serviceName: ['', Validators.required],
    serviceDesc: ['', Validators.required],
  })

  constructor(public api: Api) {}

  ngOnInit() {
    this.initServicesList();
  }

  async initServicesList() {
    this.services = await this.api.getServices();
  }

  openModal() {
    this.modal.isOpen = true;
  }

  closeModal() {
    this.modal.dismiss(null, 'cancel');
    this.formSubmitLabel = "Créer l'activité";
  }

  async onSubmitForm() {
    if (this.serviceForm.invalid) {
      console.warn("Formulaire invalide");
      return;
    }

    const rawValue = this.serviceForm.value;

    const payload: ServicePayload = {
      serviceName: rawValue.serviceName ?? '',
      serviceDesc: rawValue.serviceDesc ?? '',
      servicePos: 0
    };

    try {
      if(this.serviceToUpdate) {
        await this.api.updateService(payload, this.serviceToUpdate.id)
          .then(async () => {
            await this.initServicesList();
            this.closeModal();
          }); 
      } else {
        await this.api.createService(payload)
          .then(async () => {
            await this.initServicesList();
            this.closeModal();
          });  
      }
    } catch (error) {
      console.error("Erreur lors de la création du service :", error);
    }
  }

  async updateService(id: number) {
    const data: Service = await this.api.getService(id);
    this.formSubmitLabel = "Mettre à jour l'activité";
    this.serviceForm.setValue({
      serviceName: data.serviceName,
      serviceDesc: data.serviceDesc
    });
    this.serviceToUpdate = data;
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
