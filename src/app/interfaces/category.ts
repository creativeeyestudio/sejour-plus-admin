export interface Category {
    id: number;
    catName: string;
    hotelInternal: boolean;
}

export interface CategoriesList {
    member: Category[];
    totalItems: number;
}

export type CategoryPayload = Omit<Category, "id">;