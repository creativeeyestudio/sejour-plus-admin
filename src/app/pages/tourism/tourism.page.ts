import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonButtons, IonModal, IonInput, IonTextarea, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Tourism, TourismList } from 'src/app/interfaces/tourism';
import { Api } from 'src/app/services/api';
import { CategoriesList } from 'src/app/interfaces/category';
import { open } from 'ionicons/icons';

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
    this.modal.isOpen = true;
  }

  closeModal() {
    this.modal.isOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  async initList() {
    this.tourismList = await this.api.getTourismList();
    this.categoriesList = await this.api.getCategoriesByType(0);
  }

  reinitForm() {
    this.tourismToUpdate = undefined;
    this.form.setValue({
      tourismName: '',
      tourismContent: '',
      tourismPhone: '',
      tourismReserve: '',
      tourismCategory: '',
      tourismWebsite: '',
    })
  }

  async onSubmitForm() {
    if(!this.form.valid) return;

    if (this.tourismToUpdate) {
      await this.api.updateTourism(this.form.value, this.tourismToUpdate.id)
        .then(() => {
          this.initList();
          this.closeModal();
        })
        .catch((err) => {
          console.error(err);
          throw err;
        })  
    } else {
      await this.api.createTourism(this.form.value)
        .then(() => {
          this.initList();
          this.closeModal();
        })
        .catch((err) => {
          console.error(err);
          throw err;
        })  
    }
  }

  async updateTourism(id: number) {
    this.closeModal();
    const data = await this.api.getTourism(id);
    this.tourismToUpdate = data;
    this.form.setValue({
      tourismName: data.tourismName,
      tourismContent: data.tourismContent,
      tourismPhone: data.tourismPhone,
      tourismReserve: data.tourismReserve,
      tourismCategory: data.tourismCategory,
      tourismWebsite: data.tourismWebsite,
    })
    this.openModal();
  }

  async deleteTourism(id: number) {
    this.api.deleteTourism(id)
      .then(() => this.initList())
      .catch((err) => {
        console.error(err);
        throw err;
      })
  }

}
