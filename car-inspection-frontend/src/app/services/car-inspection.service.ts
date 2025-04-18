import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarService {
  private apiUrl = 'http://localhost:3000/cars';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
