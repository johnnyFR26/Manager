import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './client-service.service';
import { Client } from './client.model';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, MatTableModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  clients: Client[] = [];
  client = {
    email: '',
    telefone: '',
    name: '',
    date: '',
    checklist: ['teste do cliente'],
    observation: '',
    id: 3,
  };
  displayedColumns: string[] = ['id', 'name', 'email', 'telefone'];
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  createClient(): void {
    this.clientService.createClient(this.client).subscribe(
      (response) => {
        console.log(response);
        // Recarregar a lista após criar um cliente, se necessário
        this.loadClients();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      (clients) => {
        this.clients = clients;
      },
      (error) => {
        console.log('Error loading clients:', error);
      }
    );
  }
}
