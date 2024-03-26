import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { ClientService } from './client-service.service';
import { Client } from './client.model';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list/to-do-list.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatChipsModule,
    MatSelectModule,RouterLink,
    RouterLinkActive,RouterOutlet,
    ToDoListComponent, 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [provideNativeDateAdapter()],
})
export class AppComponent implements OnInit {
  clients: Client[] = [];
  client = {
    email: '',
    telefone: '',
    name: '',
    date: '',
    checklist: [''],
    observation: '',
    id: 0,
    plan: '',
  };
  displayedColumns: string[] = ['id', 'name', 'email', 'telefone', 'observation'];
  
  

  constructor(private clientService: ClientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadClients();
    
  }
  

  
  separatorKeysCodes: string[] = ['ENTER', 'COMMA'];

  addChecklistItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.client.checklist.push(value.trim());
    }

    // Limpa o input
    if (input) {
      input.value = '';
    }
  }

  removeChecklistItem(item: string): void {
    const index = this.client.checklist.indexOf(item);

    if (index >= 0) {
      this.client.checklist.splice(index, 1);
    }
  }

  createClient(): void {
    this.clientService.getClients().subscribe(
      (clients) => {
        const lastClientId = clients.length > 0 ? clients[clients.length - 1].id : 0;
        this.client.id = lastClientId + 1;
        ;

        this.clientService.createClient(this.client).subscribe(
          (response) => {
            console.log(response);

            this.client.date = '';
            this.client.email = '';
            this.client.name = '';
            this.client.observation = '';
            this.client.telefone = '';
            this.client.plan = ''; 
            this.loadClients();
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log('Error loading clients:', error);
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

  getClientById(id: number): void {
    this.clientService.getClientByid(id).subscribe(
      (client) => {
        // Manipular os dados do cliente retornado
        console.log(client);
      },
      (error) => {
        console.log('Error loading client by ID:', error);
      }
    );
  }
  loadClientsByPlan(plan: string): void {
    this.clientService.getClientsByPlan(plan).subscribe(
      (clients) => {
        this.clients = clients;
        console.log(clients.length)
      },
      (error) => {
        console.log('Error loading clients by plan:', error);
      }
    );
  }
  onPlanSelectionChange(plan: string): void {
    this.loadClientsByPlan(plan);
  }

  openWebPage(): void {
    // Defina o link da página web que você deseja abrir
    const url = 'https://9000-monospace-my-todolist-1710559675928.cluster-hf4yr35cmnbd4vhbxvfvc6cp5q.cloudworkstations.dev/?monospaceUid=660900';

    // Abra uma nova página da web
    window.open(url, '_blank');
  }
}
