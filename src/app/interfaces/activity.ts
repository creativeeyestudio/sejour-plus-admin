export interface Activity {
    id: number;
    actName: string;
    actContent: string;
    actReserve?: string;
    actCategory?: string;
}

export interface ActivitiesList {
    member: Activity[];
    totalItems: number;
}