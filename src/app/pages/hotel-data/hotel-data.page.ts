import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonInput, IonButton } from '@ionic/angular/standalone';
import { HotelData } from 'src/app/interfaces/hotel-data';
import { Api } from 'src/app/services/api';
import { DateTimeConverter } from 'src/app/services/date-time-converter';

@Component({
  selector: 'app-hotel-data',
  templateUrl: './hotel-data.page.html',
  styleUrls: ['./hotel-data.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonGrid, IonRow, ReactiveFormsModule]
})

export class HotelDataPage implements OnInit {

  hotel?: HotelData;
  newHotel: boolean = false;
  updateHotel: boolean = false;

  constructor(public api: Api, public dtConvert: DateTimeConverter) { }

  ngOnInit() {
    this.getHotelData();  
  }

  // ---------------------------------------------
  // DONNEES DE L'HÔTEL
  // ---------------------------------------------
  async getHotelData() {
    try {
      this.hotel = await this.api.getHotel();
    } catch (error: any) {
      (error.response.status === 404) 
        ? this.newHotel = true
        : console.error(error)
    }
  }

  // ---------------------------------------------
  // FORMULAIRE
  // ---------------------------------------------
  formModel: FormField[] = [
    { label: "Nom de l'hôtel", type: "text", sizeMd: '12', sizeLg: '12', formControlName: 'hotelName', required: true },
    { label: "Téléphone", type: "tel", sizeMd: '6', sizeLg: '6', formControlName: 'hotelPhone', required: true },
    { label: "E-mail", type: "email", sizeMd: '6', sizeLg: '6', formControlName: 'hotelEmail', required: true },
    { label: "Lien Map", type: "url", sizeMd: '12', sizeLg: '12', formControlName: 'hotelMap', required: true },
    { label: "Site Internet", type: "url", sizeMd: '12', sizeLg: '12', formControlName: 'hotelWebsite' },
    { label: "Check In", type: "time", sizeMd: '6', sizeLg: '6', formControlName: 'hotelCheckIn', required: true },
    { label: "Check Out", type: "time", sizeMd: '6', sizeLg: '6', formControlName: 'hotelCheckOut', required: true },
    { label: "Nom du Wi-Fi", type: "text", sizeMd: '6', sizeLg: '6', formControlName: 'hotelWifiName', required: true },
    { label: "Mot de passe Wi-Fi", type: "text", sizeMd: '6', sizeLg: '6', formControlName: 'hotelWifiPassword', required: true },
    { label: "Code Parking", type: "text", sizeMd: '12', sizeLg: '12', formControlName: 'hotelParking' },
  ];

  formData: FormGroup = new FormGroup(
    this.formModel.reduce((controls, field) => {
      controls[field.formControlName] = new FormControl(
        '',
        field.required ? Validators.required : []
      );
      return controls;
    }, {} as Record<string, FormControl>)
  );

  async onSubmitForm() {
    const formDataRaw = this.formData.value;

    const data = {
      ...formDataRaw,
      hotelCheckIn: this.dtConvert.convertTimeToISO(formDataRaw.hotelCheckIn),
      hotelCheckOut: this.dtConvert.convertTimeToISO(formDataRaw.hotelCheckOut)
    };

    try {
      this.newHotel 
        ? await this.api.createHotel(data)
        : await this.api.updateHotel(data, this.hotel?.id ?? 1);

      await this.getHotelData();
      this.newHotel = false;

    } catch (err) {
      console.error("Erreur lors de la soumission :", err);
    }
  }

}

interface FormField {
  label: string;
  type: string;
  sizeMd: string;
  sizeLg: string;
  formControlName: string;
  required?: boolean;
}