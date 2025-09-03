import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonButtons, IonModal, IonInput, IonTextarea, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { TourismList } from 'src/app/interfaces/tourism';
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
  categoriesList?: CategoriesList;

  form: FormGroup = this.fb.group({
    tourismName: ['', Validators.required],
    tourismContent: ['', Validators.required],
    tourismPhone: [''],
    tourismReserve: [''],
    tourismWebsite: [''],
    tourismCategory: ['']
  })

  ngOnInit() {
    this.initList();
  }

  closeModal() {
    this.modal.isOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  async initList() {
    this.tourismList = await this.api.getTourismList();
    this.categoriesList = await this.api.getCategoriesByType(0);
  }

  async onSubmitForm() {
    if(!this.form.valid) return;

    await this.api.createTourism(this.form.value)
      .then(() => {
        this.initList();
        this.closeModal();
      })
      .catch((err) => {
        console.error(err);
        throw err;
      })

    console.log(this.form.value);
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
