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
      console.log(this.hotel);
    } catch (error: any) {
      if (error.response.status === 404) {
        this.newHotel = true;
      } else {
        console.error(error);
      }
    }
  }

  // ---------------------------------------------
  // FORMULAIRE
  // ---------------------------------------------
  formModel: FormField[] = [
    { label: 'Nom de l\'hôtel', type: 'text', sizeMd: '12', sizeLg: '12', formControlName: 'hotelName' },
    { label: 'Téléphone', type: 'tel', sizeMd: '6', sizeLg: '6', formControlName: 'hotelPhone' },
    { label: 'E-mail', type: 'email', sizeMd: '6', sizeLg: '6', formControlName: 'hotelEmail' },
    { label: 'Lien Map', type: 'url', sizeMd: '12', sizeLg: '12', formControlName: 'hotelMap' },
    { label: 'Site Internet', type: 'url', sizeMd: '12', sizeLg: '12', formControlName: 'hotelWebsite' },
    { label: 'Check In', type: 'time', sizeMd: '6', sizeLg: '6', formControlName: 'hotelCheckIn' },
    { label: 'Check Out', type: 'time', sizeMd: '6', sizeLg: '6', formControlName: 'hotelCheckOut' },
    { label: 'Nom du Wi-Fi', type: 'text', sizeMd: '6', sizeLg: '6', formControlName: 'hotelWifiName' },
    { label: 'Mot de passe Wi-Fi', type: 'text', sizeMd: '6', sizeLg: '6', formControlName: 'hotelWifiPassword' },
    { label: 'Code Parking', type: 'text', sizeMd: '12', sizeLg: '12', formControlName: 'hotelParking' },
  ];

  formData: FormGroup = new FormGroup({
    hotelName: new FormControl('', Validators.required),
    hotelPhone: new FormControl('', Validators.required),
    hotelEmail: new FormControl('', Validators.required),
    hotelMap: new FormControl('', Validators.required),
    hotelWebsite: new FormControl(''),
    hotelCheckIn: new FormControl<Date | null>(null, Validators.required),
    hotelCheckOut: new FormControl<Date | null>(null, Validators.required),
    hotelWifiName: new FormControl('', Validators.required),
    hotelWifiPassword: new FormControl('', Validators.required),
    hotelParking: new FormControl('')
  })

  onSubmitForm() {
    const raw = this.formData.value;
    const payload = {
      ...raw,
      hotelCheckIn: this.dtConvert.convertTimeToISO(raw.hotelCheckIn),
      hotelCheckOut: this.dtConvert.convertTimeToISO(raw.hotelCheckOut)
    };

    console.log(payload);

    this.api.createHotel(payload)
      .then(() => {
        this.getHotelData();
        this.newHotel = false;
      })
      .catch((err) => {
        console.error(`Erreur lors du POST ${err}`);
      });
  }
}

interface FormField {
  label: string;
  type: string;
  sizeMd: string;
  sizeLg: string;
  formControlName: string;
}