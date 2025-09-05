import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonButtons, IonButton, IonModal, IonInput, IonTextarea, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ActivitiesList, Activity } from 'src/app/interfaces/activity';
import { Api } from 'src/app/services/api';
import { CategoriesList } from 'src/app/interfaces/category';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
  standalone: true,
  imports: [IonModal, IonButton, IonButtons, IonItem, IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonTextarea, IonSelect, IonSelectOption, ReactiveFormsModule]
})
export class ActivitiesPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  constructor(public api: Api, public fb: FormBuilder) { }
  
  list?: ActivitiesList;
  categories?: CategoriesList;
  actToUpdate?: Activity;

  apiCall = this.api.activities;

  form: FormGroup = this.fb.group({
    actName: ['', Validators.required],
    actContent: ['', Validators.required],
    actReserve: [''],
    actCategory: ['', Validators.required],
  });

  ngOnInit() {
    this.initList();
  }

  reinitForm() {
    this.form.reset();
    this.actToUpdate = undefined;
  }

  openModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss(null, 'cancel');
  }

  async initList() {
    this.list = await this.apiCall.getAll();
    this.categories = await this.api.getCategoriesByType(1);
  }

  async onSubmitForm() {
    if (this.form.invalid) return;

    try {
      this.actToUpdate
        ? await this.apiCall.update(this.actToUpdate.id, this.form.value)
        : await this.apiCall.create(this.form.value);

      await this.initList();
      this.closeModal();
    } catch (err) {
      console.error(
        this.actToUpdate
          ? `Erreur lors de la modification de l'activité ID ${this.actToUpdate.id} :`
          : "Erreur lors de la création de l'activité :",
        err
      );
    }
  }

  async updateActivity(id: number) {
    this.actToUpdate = await this.apiCall.getOne(id);
    this.form.patchValue(this.actToUpdate);
    this.openModal();
  }

  async deleteActivity(id: number) {
    await this.apiCall.delete(id)
      .then(() => this.initList())
      .catch((err) => console.error(err))
  }

}
