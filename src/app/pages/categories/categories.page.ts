import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonModal, IonList, IonItem, IonInput, IonCheckbox, IonLabel } from '@ionic/angular/standalone';
import { Api } from 'src/app/services/api';
import { CategoriesList } from 'src/app/interfaces/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonLabel, IonCheckbox, IonInput, IonItem, IonList, IonModal, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CategoriesPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  list?: CategoriesList;
  formBtnLabel: string = 'Créer une catégorie';

  private fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    catName: ['', Validators.required],
    hotelInternal: [false, Validators.required],
  });

  constructor(public api: Api) {}

  ngOnInit() {
    this.initCategoriesList();
  }

  async initCategoriesList() {
    this.list = await this.api.getCategories();
  }

  closeModal() {
    this.modal.dismiss(null, 'close');
  }

  async onSubmitForm() {
    await this.api.createCategory(this.form.value)
      .then(async () => {
        await this.initCategoriesList();
        this.closeModal()
      })
      .catch((error) => {
        console.error(`Erreur lors de la création de la catégorie : ${error}`);
        throw error;
      });
  }
}
