import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HotelData, HotelPayload } from '../interfaces/hotel-data';
import axios from 'axios';
import { Service, ServicePayload, ServicesList } from '../interfaces/service';

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

  // ------------------------------------------
  // Services
  // ------------------------------------------
  private readonly servicesApi: string = `${environment.apiUrl}/api/services`;

  async getServices(): Promise<ServicesList> {
    try {
      const response = await axios.get(`${this.servicesApi}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createService(servicePayload: ServicePayload) {
    try {
      const response = await axios.post<Service>(`${this.servicesApi}`, servicePayload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}