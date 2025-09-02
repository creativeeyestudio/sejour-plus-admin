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

export type ServicePayload = Omit<Service, "id">;