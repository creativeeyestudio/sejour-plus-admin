export interface HotelData {
    id: number,
    hotelName: string,
    hotelPhone: string,
    hotelEmail: string,
    hotelMap: string,
    hotelWebsite?: string,
    hotelCheckIn: string | Date,
    hotelCheckOut: string | Date,
    hotelWifiName: string,
    hotelWifiPassword: string,
    hotelParking?: string
}

export type HotelPayload = Omit<HotelData, "id">;
