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
  private hotel = new ApiCall<HotelData>;

  async getHotel(id: number = 1): Promise<HotelData> {
    return this.hotel.getOne(this.hotelDataApi, id);
  }

  async createHotel(hotelPayload: HotelPayload) {
    return this.hotel.create(this.hotelDataApi, hotelPayload);
  }

  async updateHotel(hotelPayload: Partial<HotelPayload>, id: number = 1) {
    return this.hotel.update(this.hotelDataApi, id, hotelPayload);
  }

  // ------------------------------------------
  // Services
  // ------------------------------------------
  private readonly servicesApi: string = `${environment.apiUrl}/api/services`;
  private servicesList = new ApiCall<ServicesList>;
  private service = new ApiCall<Service>;

  async getServices(): Promise<ServicesList> {
    return this.servicesList.getAll(this.servicesApi);
  }

  async getService(id: number): Promise<Service> {
    return this.service.getOne(this.servicesApi, id);
  }

  async createService(servicePayload: ServicePayload) {
    return this.service.create(this.servicesApi, servicePayload);
  }

  async updateService(servicePayload: Partial<ServicePayload>, id: number) {
    return this.service.update(this.servicesApi, id, servicePayload);
  }

  async deleteService(id: number) {
    return this.service.delete(this.servicesApi, id);
  }

  // ------------------------------------------
  // Catégories
  // ------------------------------------------
  private readonly categoriesApi: string = `${environment.apiUrl}/api/categories`;
  private categoriesList = new ApiCall<CategoriesList>;
  private category = new ApiCall<Category>;

  async getCategories(): Promise<CategoriesList> {
    return this.categoriesList.getAll(this.categoriesApi);
  }

  async getCategoriesByType(hotelInternal: number): Promise<CategoriesList> {
    return this.categoriesList.getAll(`${this.categoriesApi}/hotel-internal/${hotelInternal}`);
  }

  async getCategory(id: number): Promise<Category> {
    return this.category.getOne(this.categoriesApi, id);
  }

  async createCategory(categoryPayload: Partial<CategoryPayload>) {
    return this.category.create(this.categoriesApi, categoryPayload);
  }

  async updateCategory(categoryPayload: Partial<CategoryPayload>, id: number) {
    return this.category.update(this.categoriesApi, id, categoryPayload);
  }

  async deleteCategory(id: number) {
    return this.category.delete(this.categoriesApi, id);
  }

  // ------------------------------------------
  // Activités
  // ------------------------------------------
  private readonly activitiesApi: string = `${environment.apiUrl}/api/activites`;
  private activityList = new ApiCall<ActivitiesList>;
  private activity = new ApiCall<Activity>;

  async getActivities(): Promise<ActivitiesList> {
    return this.activityList.getAll(this.activitiesApi);
  }

  async getActivity(id: number): Promise<Activity> {
    return this.activity.getOne(this.activitiesApi, id);
  }

  async createActivity(activityPayload: Partial<ActivityPayload>) {
    return this.activity.create(this.activitiesApi, activityPayload);
  }

  async updateActivity(activityPayload: Partial<ActivityPayload>, id: number) {
    return this.activity.update(this.activitiesApi, id, activityPayload);
  }

  async deleteActivity(id: number) {
    return this.activity.delete(this.activitiesApi, id);
  }

  // ------------------------------------------
  // Tourisme
  // ------------------------------------------
  private readonly tourismApi: string = `${environment.apiUrl}/api/tourism`;
  private tourismList = new ApiCall<TourismList>;
  private tourism = new ApiCall<Tourism>;

  async getTourismList(): Promise<TourismList> {
    return this.tourismList.getAll(this.tourismApi);
  }

  async getTourism(id: number): Promise<Tourism> {
    return this.tourism.getOne(this.tourismApi, id);
  } 

  async createTourism(tourismPayload: Partial<TourismPayload>) {
    return this.tourism.create(this.tourismApi, tourismPayload);
  }

  async updateTourism(tourismPayload: Partial<TourismPayload>, id: number) {
    return this.tourism.update(this.tourismApi, id, tourismPayload);
  }

  async deleteTourism(id: number) {
    return this.tourism.delete(this.tourismApi, id);
  }
}

class ResourceApi<T, TList> {
  constructor(private apiUrl: string) {}

  private api = new ApiCall<T>();
  private apiList = new ApiCall<TList>();

  getAll(): Promise<TList> {
    return this.apiList.getAll(this.apiUrl);
  }

  getOne(id: number): Promise<T> {
    return this.api.getOne(this.apiUrl, id);
  }

  create(payload: Partial<T>): Promise<T> {
    return this.api.create(this.apiUrl, payload);
  }

  update(id: number, payload: Partial<T>): Promise<T> {
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