import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeConverter {

  public convertTimeStringToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);
    return d;
  }

  public normalizeTime(time: string): string {
    // si time = "14:30" → retourne "14:30:00"
    return time.length === 5 ? `${time}:00` : time;
  }

  public convertTimeToISO(time: string): string {
    // time attendu sous la forme "HH:mm:ss"
    const [hours, minutes, seconds] = time.split(':').map(Number);

    const date = new Date();
    date.setHours(hours, minutes, seconds || 0, 0);

    return date.toISOString(); // format ISO attendu par l'API
  }


}
