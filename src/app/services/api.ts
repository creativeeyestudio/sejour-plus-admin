import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HotelData, HotelPayload } from '../interfaces/hotel-data';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class Api {
  // ------------------------------------------
  // Hotel Data
  // ------------------------------------------
  private readonly hotelDataApi: string = `${environment.apiUrl}/api/hotels`;

  async getHotel(id: number = 1): Promise<HotelData> {
    try {
      const response = await axios.get<HotelData>(`${this.hotelDataApi}/${id}`);
      return response.data;  
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createHotel(hotelPayload: HotelPayload) {
    try {
      const response = await axios.post<HotelData>(`${this.hotelDataApi}`, hotelPayload);
      console.log("Hôtel crée");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateHotel(hotelPayload: Partial<HotelPayload>, id: number = 1) {
    try {
      const response = await axios.patch<HotelData>(`${this.hotelDataApi}/${id}`, hotelPayload)
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}