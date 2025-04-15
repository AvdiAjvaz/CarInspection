import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private apiUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  registerClient(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  GetClientById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  updateClient(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}
