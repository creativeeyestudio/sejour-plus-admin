export interface Service {
    serviceName: string;
    serviceDesc: string;
    servicePos: number;
}

export interface ServicesList {
    member: Service[];
    totalItems: number;
}