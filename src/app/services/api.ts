import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { HotelData, HotelPayload } from '../interfaces/hotel-data';
import { CategoriesList, Category, CategoryPayload } from '../interfaces/category';
import { Service, ServicePayload, ServicesList } from '../interfaces/service';
import { ActivitiesList, Activity, ActivityPayload } from '../interfaces/activity';
import { Tourism, TourismList, TourismPayload } from '../interfaces/tourism';

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
      const response = await axios.get<ServicesList>(`${this.servicesApi}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getService(id: number): Promise<Service> {
    try {
      const response = await axios.get<Service>(`${this.servicesApi}/${id}`);
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

  async updateService(servicePayload: Partial<ServicePayload>, id: number) {
    try {
      const response = await axios.patch<Service>(`${this.servicesApi}/${id}`, servicePayload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteService(id: number) {
    try {
      const response = await axios.delete<Service>(`${this.servicesApi}/${id}`);
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

  async getCategoriesByType(hotelInternal: number): Promise<CategoriesList> {
    try {
      const response = await axios.get<CategoriesList>(`${this.categoriesApi}/hotel-internal/${hotelInternal}`);
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

  async createCategory(categoryPayload: Partial<CategoryPayload>) {
    try {
      const response = await axios.post<Category>(`${this.categoriesApi}`, categoryPayload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateCategory(categoryPayload: Partial<CategoryPayload>, id: number) {
    try {
      const response = await axios.patch<Category>(`${this.categoriesApi}/${id}`, categoryPayload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteCategory(id: number) {
    try {
      const response = await axios.delete<Category>(`${this.categoriesApi}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // ------------------------------------------
  // Activités
  // ------------------------------------------
  private readonly activitiesApi: string = `${environment.apiUrl}/api/activites`;

  async getActivities(): Promise<ActivitiesList> {
    try {
      const response = await axios.get<ActivitiesList>(`${this.activitiesApi}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'API Activités : ${error}`);
      throw error;
    }
  }

  async getActivity(id: number): Promise<Activity> {
    try {
      const response = await axios.get<Activity>(`${this.activitiesApi}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'API Activité avec ID ${id} : ${error}`);
      throw error;
    }
  }

  async createActivity(activityPayload: Partial<ActivityPayload>) {
    try {
      const response = await axios.post<Activity>(`${this.activitiesApi}`, activityPayload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateActivity(activityPayload: Partial<ActivityPayload>, id: number) {
    try {
      const response = await axios.patch<Activity>(`${this.activitiesApi}/${id}`, activityPayload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteActivity(id: number) {
    try {
      const response = await axios.delete<Activity>(`${this.activitiesApi}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // ------------------------------------------
  // Tourisme
  // ------------------------------------------
  private readonly tourismApi: string = `${environment.apiUrl}/api/tourism`;

  async getTourismList(): Promise<TourismList> {
    try {
      const response = await axios.get<TourismList>(`${this.tourismApi}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'API "Lieux touristiques" : ${error}`);
      throw error;
    }
  }

  async getTourism(id: number): Promise<Tourism> {
    try {
      const response = await axios.get<Tourism>(`${this.tourismApi}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'API Tourisme avec ID ${id} : ${error}`);
      throw error;
    }
  } 

  async createTourism(tourismPayload: Partial<TourismPayload>) {
    try {
      const response = await axios.post<Tourism>(`${this.tourismApi}`, tourismPayload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateTourism(tourismPayload: Partial<TourismPayload>, id: number) {
    try {
      const response = await axios.patch<Tourism>(`${this.tourismApi}/${id}`, tourismPayload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteTourism(id: number) {
    try {
      const response = await axios.delete<Tourism>(`${this.tourismApi}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}