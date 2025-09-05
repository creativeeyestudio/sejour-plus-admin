export interface Tourism {
    id: number;
    tourismName: string;
    tourismContent: string;
    tourismReserve?: string;
    tourismPhone?: string;
    tourismCategory?: string;
    tourismWebsite?: string;
}

export interface TourismList {
    member: Tourism[];
    totalItems: number;
}