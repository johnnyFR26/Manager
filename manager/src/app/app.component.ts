import { ClientDialogComponent } from './client-dialog/client-dialog.component';
import { Component, OnInit } from '@angular/core';
import { ClientService } from './client-service.service';
import { Client } from './client.model';
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
import { ToDoListComponent } from './to-do-list/to-do-list/to-do-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Suporte } from './suporte.model';


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
    MatSelectModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ToDoListComponent, 
    MatInput,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [provideNativeDateAdapter()],
})
export class AppComponent implements OnInit {
  clients: Client[] = [];
  suportes: Suporte[] = [];


  client: Client = {
    id: 0,
    name: '',
    email: '',
    telefone: '',
    observation: '',
    date: '',
    plan: '',
    passToPass: '',
    suporte_name: '',
  };
  
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
  separatorKeysCodes: string[] = ['ENTER', 'COMMA'];

  plans = ['Recorrente', 'Pix 49,90', 'Pix 79,90', 'Anual'];

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  constructor(private clientService: ClientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadClients();
    this.getSuportes();
  }


  async getCliebtsBySuporte(suporte: number): Promise<void> {
    try {
      const response = await this.clientService.getClientsbySuporte(suporte).toPromise();
      
      if (response && response.clients) {
        this.clients = response.clients;
      } else {
        console.log('Nenhum cliente encontrado para o suporte fornecido.');
        this.clients = [];
      }
    } catch (error) {
      console.log('Erro ao carregar clientes por suporte:', error);
    }
  }
  

  selectClientsByPlan(plan: string): void {
    this.clients = this.clients.filter((client) => client.plan === plan);
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
        console.table(client);
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
  
  
  getSuportes(): void{
    this.clientService.getSuportes().subscribe(
      (suportes: Suporte[]) => {
        this.suportes = suportes;
        console.table(this.suportes);
      },
      (error) => {
        console.error('Erro ao carregar suportes:', error);
      }
    );

  }
}
