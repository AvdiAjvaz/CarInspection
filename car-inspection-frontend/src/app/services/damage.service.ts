import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DamageService {
  private apiUrl = 'http://localhost:3000/damages';

  constructor(private http: HttpClient) {}

  registerDamage(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getDamagesByCar(carId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/car/${carId}`);
  }
}
