// client-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client.model'; 

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  createClient(client: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, client);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }
}
