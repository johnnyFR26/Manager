// client-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client.model'; 
import { Suporte } from './suporte.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:3333/';

  constructor(private http: HttpClient) {}

  createClient(client: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}clients`, client);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}clientsWithSuporte`);
  }

  getSuportes(): Observable<Suporte[]> {
    return this.http.get<Suporte[]>(`${this.apiUrl}suportes`);
  }

  getClientByid(id:number): Observable<Client>{
    const url = `${this.apiUrl}clients/${id}`;
    return this.http.get<Client>(url);
  }

  updateClient(id: number, client: any): Observable<any> {
    const url = `${this.apiUrl}clients/${id}`;
    return this.http.put(url, client);
  }

  getClientsByPlan(plan: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/plan/${plan}`);
  }

  getClientsbySuporte(suporte: number): Observable<Suporte> {
    return this.http.get<Suporte>(`${this.apiUrl}suportes/${suporte}/clients`);
  }

  updateSecondPayment(clientId: number) {
    const url = `${this.apiUrl}clients/${clientId}`;
    return this.http.put(url, { secondPayment: true });
  }
}
