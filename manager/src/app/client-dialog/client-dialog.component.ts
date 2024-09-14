import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../to-do-list/to-do-list/Task.model';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { ClientService } from '../client-service.service';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { Suporte } from '../suporte.model';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-client-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatOption,
    MatDatepicker, 
    MatDatepickerModule, 
    MatFormFieldModule,
    MatInputModule,
    MatInput, MatSelectModule
  ],
  template: `
  <h2 mat-dialog-title>Adicionar Cliente</h2>
<form (ngSubmit)="createClient()" #clientForm="ngForm">
  <mat-form-field>
    <mat-label>Nome</mat-label>
    <input matInput placeholder="Nome" [(ngModel)]="client.name" name="name" required>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Email</mat-label>
    <input matInput placeholder="Email" [(ngModel)]="client.email" name="email" required>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Telefone</mat-label>
    <input matInput placeholder="Telefone" [(ngModel)]="client.telephone" name="telefone" required>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Data de contratação</mat-label>
    <input matInput [matDatepicker]="picker" placeholder="Data de contratação" [(ngModel)]="client.date" name="date" [ngModelOptions]="{standalone: true}" required>
    <mat-hint>DD/MM/YYYY</mat-hint>
    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>

  <mat-form-field class="example-full-width">
    <mat-label>Observações</mat-label>
    <textarea matInput placeholder="Alguma Observação..." [(ngModel)]="client.observation" [ngModelOptions]="{standalone: true}"></textarea>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Plano do cliente</mat-label>
    <mat-select [(ngModel)]="client.plan" name="plan" required>
      <mat-option value="Pix 49,90">Pix 49,90</mat-option>
      <mat-option value="Recorrente">Recorrente</mat-option>
      <mat-option value="Mensal R$79,90">Mensal R$79,90</mat-option>
    </mat-select>
  </mat-form-field>

  <mat-form-field>
  <mat-label>Suporte</mat-label>
  <mat-select [(ngModel)]="client.suporteId" name="suporteId" required>
    <mat-option *ngFor="let suporte of suportes" [value]="suporte.id">{{ suporte.name }}</mat-option>
  </mat-select>
</mat-form-field>

  <button mat-raised-button color="primary" type="submit">Adicionar Cliente</button>
</form>

`,
  styleUrl: './client-dialog.component.scss',
  providers: [provideNativeDateAdapter()],

})
export class ClientDialogComponent implements OnInit {

  suportes: Suporte[] = [];

  ngOnInit(): void {
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



  client = {
    name: '',
    email: '',
    telephone: '',
    date: '',
    observation: '',
    plan: '',
    passToPass: {
      Perfil: false,
      Cardapio: false,
      Impressao: false,
      Robo: false,
    },
    secondPayment: false,
    suporteId: 3,
    updatedAt: new Date()
  };

  //constructor(public dialogRef: MatDialogRef<ClientModalComponent>) {}

  createCliente() {
    // Aqui você pode adicionar a lógica para criar o cliente
    console.log(this.client);
  }
  createClient(): void {
    console.log(this.client);
    this.clientService.createClient(this.client).subscribe(
      (response) => {
        console.log(response);

        this.client.date = '';
        this.client.email = '';
        this.client.name = '';
        this.client.observation = '';
        this.client.telephone = '';
        this.client.plan = ''; 
        this.dialogRef.close();

      },
      (error) => {
        console.log(error);
      }
    );
  }

  constructor(private clientService: ClientService,
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task, enableDelete: boolean }) { }
    cancel(): void {
      
      this.dialogRef.close(this.data);
    }

}
export interface ClienteDialogData {
  client: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
