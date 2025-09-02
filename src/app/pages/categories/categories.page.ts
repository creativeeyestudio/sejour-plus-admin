import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonModal, IonList, IonItem, IonInput, IonCheckbox, IonLabel } from '@ionic/angular/standalone';
import { Api } from 'src/app/services/api';
import { CategoriesList, Category } from 'src/app/interfaces/category';

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
  catToUpdate?: Category;
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

  openModal() {
    this.modal.isOpen = true;
  }

  closeModal() {
    this.modal.isOpen = false;
    this.reinitForm();
  }

  reinitForm() {
    this.form.setValue({
      catName: '',
      hotelInternal: false,
    });
  }

  async onSubmitForm() {
    try {
      if (this.catToUpdate) {
        await this.api.updateCategory(this.form.value, this.catToUpdate.id)
          .then(() => this.catToUpdate = undefined);
        this.formBtnLabel = 'Créer une catégorie'; // spécifique à l'update
      } else {
        await this.api.createCategory(this.form.value);
      }

      await this.initCategoriesList();
      this.closeModal();

    } catch (error) {
      const action = this.catToUpdate ? 'modification' : 'création';
      const idInfo = this.catToUpdate ? ` ID ${this.catToUpdate.id}` : '';
      console.error(`Erreur lors de la ${action} de la catégorie${idInfo} :`, error);
      throw error;
    }
}


  createCategory() {
    this.closeModal();
    this.openModal();
    this.reinitForm();
  }

  async updateCategory(id: number) {
    this.closeModal();
    this.openModal();
    this.formBtnLabel = 'Modifier la catégorie';
    await this.api.getCategory(id)
      .then((data) => {
        this.catToUpdate = data;
        this.form.setValue({
          catName: data.catName,
          hotelInternal: data.hotelInternal,
        });
      })
      .catch((error) => {
        console.error(`Erreur lors de la récupération de la catégorie ID ${id}`);
        throw error;
      });
  }

  async deleteCategory(id: number) {
    await this.api.deleteCategory(id)
      .then(() => this.initCategoriesList())
      .catch((error) => {
        console.error(`Erreur lors de la suppression de la catégorie ID ${id} : ${error}`);
        throw error;
      })
  }
}
