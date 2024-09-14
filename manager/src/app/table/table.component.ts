//import { ClientDialogComponent } from './client-dialog/client-dialog.component';
import { Component, OnInit } from '@angular/core';
//import { ClientService } from './client-service.service';
//import { Client } from './client.model';
import { MatTableModule } from '@angular/material/table';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
//import { ToDoListComponent } from './to-do-list/to-do-list/to-do-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ClientService } from '../client-service.service';
import { Client } from '../client.model';
//import { Suporte } from './suporte.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule,
    HttpClientModule,
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatChipsModule,
    MatSelectModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatInput,
    MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  ngOnInit(): void {
    this.loadClients();
  }

  constructor( private clientService: ClientService) { }

  clients: Client[] = [];

  displayedColumns: string[] = [
    'edit',
    'id', 
    'name', 
    'email', 
    'telefone', 
    'observation', 
    'date', 
    'suporte_name', 
    'secondPayment'
  ];

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

  updateSecondPayment(clientId: number) {
    this.clientService.updateSecondPayment(clientId).subscribe(
      response => {
        console.log('Pagamento atualizado com sucesso!', response);
      },
      error => {
        console.error('Erro ao atualizar o pagamento:', error);
      }
    );
  }

}
