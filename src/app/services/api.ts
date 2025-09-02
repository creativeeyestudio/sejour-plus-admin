import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HotelData, HotelPayload } from '../interfaces/hotel-data';
import axios from 'axios';
import { CategoriesList, Category } from '../interfaces/category';

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

  // ------------------------------------------
  // Catégories
  // ------------------------------------------
  private readonly categoriesApi: string = `${environment.apiUrl}/api/categories`;

  async getCategories(): Promise<CategoriesList> {
    try {
      const response = await axios.get<CategoriesList>(`${this.categoriesApi}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'API Catégories : ${error}`);
      throw error;
    }
  }

  async getCategory(id: number): Promise<Category> {
    try {
      const response = await axios.get<Category>(`${this.categoriesApi}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'API Catégorie avec ID ${id} : ${error}`);
      throw error;
    }
  }

  async createCategory(categoryPayload: Partial<Category>) {
    try {
      const response = await axios.post(`${this.categoriesApi}`, categoryPayload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateCategory(categoryPayload: Partial<Category>, id: number) {
    try {
      const response = await axios.patch(`${this.categoriesApi}/${id}`, categoryPayload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteCategory(id: number) {
    try {
      const response = await axios.delete(`${this.categoriesApi}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}