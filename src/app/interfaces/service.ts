export interface Service {
    id: number
    serviceName: string;
    serviceDesc: string;
    servicePos: number;
}

export interface ServicesList {
    member: Service[];
    totalItems: number;
}