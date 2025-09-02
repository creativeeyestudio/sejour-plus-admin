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
  formBtnLabel: string = 'Créer une activité';

  form: FormGroup = this.fb.group({
    actName: ['', Validators.required],
    actContent: ['', Validators.required],
    actReserve: [''],
    actCategory: ['', Validators.required],
  });

  ngOnInit() {
    this.initList();
  }

  openModal() {
    this.modal.isOpen = true;
  }

  closeModal() {
    this.modal.isOpen = false;
    this.modal.dismiss(null, 'cancel');
    this.formBtnLabel = 'Créer une activité';
    this.actToUpdate = undefined;
  }

  async initList() {
    this.list = await this.api.getActivities();
    this.categories = await this.api.getCategoriesByType(true);
  }

  async onSubmitForm() {
    if (!this.form.valid) return;

    if (this.actToUpdate) {
      await this.api.updateActivity(this.form.value, this.actToUpdate.id)
        .then(async () => {
          await this.initList();
          this.closeModal();
        })
        .catch((err) => {
          console.error(err);
          throw err;
        }) 
    } else {
      await this.api.createActivity(this.form.value)
        .then(async () => {
          await this.initList();
          this.closeModal()
        })
        .catch((err) => {
          console.error(err);
          throw err;
        })  
    }    
  }

  createActivity() {
    this.form.setValue({
      actName: '',
      actContent: '',
      actCategory: '',
      actReserve: ''
    })
  }

  async updateActivity(id: number) {
    this.closeModal();
    this.formBtnLabel = 'Modifier une activité';
    const data: Activity = await this.api.getActivity(id);
    this.actToUpdate = data;
    this.form.setValue({
      actName: data.actName,
      actContent: data.actContent,
      actCategory: data.actCategory,
      actReserve: data.actReserve
    })
    this.openModal();
  }

  async deleteActivity(id: number) {
    await this.api.deleteActivity(id)
      .then(() => this.initList())
      .catch((err) => {
        console.error(err);
        throw err;
      })
  }

}
