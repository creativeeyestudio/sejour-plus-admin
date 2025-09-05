import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { HotelData } from '../interfaces/hotel-data';
import { CategoriesList, Category } from '../interfaces/category';
import { Service, ServicesList } from '../interfaces/service';
import { ActivitiesList, Activity } from '../interfaces/activity';
import { Tourism, TourismList } from '../interfaces/tourism';

@Injectable({
  providedIn: 'root'
})

export class Api {

  // ------------------------------------------
  // Hotel Data
  // ------------------------------------------
  hotel = new ResourceApi<HotelData, HotelData>(`${environment.apiUrl}/api/hotels`);

  // ------------------------------------------
  // Services
  // ------------------------------------------
  service = new ResourceApi<Service, ServicesList>(`${environment.apiUrl}/api/services`);

  // ------------------------------------------
  // Catégories
  // ------------------------------------------
  categories = new ResourceApi<Category, CategoriesList>(`${environment.apiUrl}/api/categories`);

  async getCategoriesByType(hotelInternal: number): Promise<CategoriesList> {
    return this.categories.getAllByPath(`hotel-internal/${hotelInternal}`);
  }

  // ------------------------------------------
  // Activités
  // ------------------------------------------
  activities = new ResourceApi<Activity, ActivitiesList>(`${environment.apiUrl}/api/activites`);

  // ------------------------------------------
  // Tourisme
  // ------------------------------------------
  tourism = new ResourceApi<Tourism, TourismList>(`${environment.apiUrl}/api/tourism`);
}

class ResourceApi<T, TList> {
  constructor(private apiUrl: string) {}

  private api = new ApiCall<T>();
  private apiList = new ApiCall<TList>();

  getAll(): Promise<TList> {
    return this.apiList.getAll(this.apiUrl);
  }

  getAllByPath(path: string): Promise<TList> {
    return this.apiList.getAll(`${this.apiUrl}/${path}`);
  }

  getOne(id: number = 1): Promise<T> {
    return this.api.getOne(this.apiUrl, id);
  }

  create(payload: Partial<T>): Promise<T> {
    return this.api.create(this.apiUrl, payload);
  }

  update(id: number = 1, payload: Partial<T>): Promise<T> {
    return this.api.update(this.apiUrl, id, payload);
  }

  delete(id: number): Promise<T> {
    return this.api.delete(this.apiUrl, id);
  }
}

class ApiCall<T> {
  async getAll(apiUrl: string): Promise<T> {
    try {
      const response = await axios.get<T>(apiUrl);
      return response.data;
    } catch (error) {
      console.error(`Erreur API (GET ALL ${apiUrl}) :`, error);
      throw error;
    }
  }

  async getOne(apiUrl: string, id: number): Promise<T> {
    try {
      const response = await axios.get<T>(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur API (GET ONE ${apiUrl}/${id}) :`, error);
      throw error;
    }
  }

  async create(apiUrl: string, payload: Partial<T>): Promise<T> {
    try {
      const response = await axios.post<T>(apiUrl, payload);
      return response.data;
    } catch (error) {
      console.error(`Erreur API (CREATE ${apiUrl}) :`, error);
      throw error;
    }
  }

  async update(apiUrl: string, id: number, payload: Partial<T>): Promise<T> {
    try {
      const response = await axios.patch<T>(`${apiUrl}/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Erreur API (UPDATE ${apiUrl}/${id}) :`, error);
      throw error;
    }
  }

  async delete(apiUrl: string, id: number): Promise<T> {
    try {
      const response = await axios.delete<T>(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur API (DELETE ${apiUrl}/${id}) :`, error);
      throw error;
    }
  }
}