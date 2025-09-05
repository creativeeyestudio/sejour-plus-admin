import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonButtons, IonModal, IonInput, IonTextarea, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Tourism, TourismList } from 'src/app/interfaces/tourism';
import { Api } from 'src/app/services/api';
import { CategoriesList } from 'src/app/interfaces/category';

@Component({
  selector: 'app-tourism',
  templateUrl: './tourism.page.html',
  styleUrls: ['./tourism.page.scss'],
  standalone: true,
  imports: [IonTextarea, IonInput, IonModal, IonButtons, IonButton, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule, ReactiveFormsModule]
})
export class TourismPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  constructor(public api: Api, public fb: FormBuilder) { }

  tourismList?: TourismList;
  tourismToUpdate?: Tourism;
  categoriesList?: CategoriesList;
  apiCall = this.api.tourism;

  form: FormGroup = this.fb.group({
    tourismName: ['', Validators.required],
    tourismContent: ['', Validators.required],
    tourismCategory: ['', Validators.required],
    tourismPhone: [''],
    tourismReserve: [''],
    tourismWebsite: ['']
  })

  ngOnInit() {
    this.initList();
  }

  openModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss(null, 'cancel');
  }

  async initList() {
    this.tourismList = await this.apiCall.getAll();
    this.categoriesList = await this.api.getCategoriesByType(0);
  }

  reinitForm() {
    this.tourismToUpdate = undefined;
    this.form.reset();
  }

  async onSubmitForm() {
    if (this.form.invalid) return;

    try {
      const data = this.form.value
      this.tourismToUpdate
        ? await this.apiCall.update(this.tourismToUpdate.id, data)
        : await this.apiCall.create(data);

      await this.initList();
      this.closeModal();

    } catch (err) {
      console.error("Erreur lors de la soumission du formulaire tourisme :", err);
    }
  }

  async updateTourism(id: number) {
    try {
      this.tourismToUpdate = await this.apiCall.getOne(id);
      this.form.patchValue(this.tourismToUpdate);
      this.openModal();
    } catch (err) {
      console.error(`Erreur lors du chargement du tourisme ID ${id} :`, err);
    }
  }

  async deleteTourism(id: number) {
    this.apiCall.delete(id)
      .then(() => this.initList())
      .catch((err) => console.error(err))
  }

}
