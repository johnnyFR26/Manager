import { Component } from '@angular/core';
import { IndexedDbService,  } from './indexed-db.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from '../../task-dialog/task-dialog.component';



@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [RouterOutlet, FormsModule,MatCardModule,
    MatFormFieldModule,MatInputModule,
   MatButtonModule ,MatListModule,CommonModule,
   MatExpansionModule,MatIconModule,MatTabsModule,],
  template: `

<button (click)="newTask()" mat-button>
    <mat-icon>add</mat-icon> Add Task
  </button>
  
  
 
  
  <!-- <button [disabled]="taskDeadline == ''" mat-raised-button color="primary" (click)="addTask()" >Adicionar Tarefa</button> -->
  


  
<mat-tab-group>
  <mat-tab label="Pendentes">
    <mat-accordion>
      @for (task of getPendingTasks() ; track $index) {
        <mat-expansion-panel [class.due-tomorrow]="isDueTomorrow(task.deadline)"
          [class.overdue]="isOverdue(task.deadline)">
          <mat-expansion-panel-header>
            <mat-panel-title>
              <span class="dateTask"> {{task.deadline | date: 'dd/MM/yyyy'}}</span>
              <span class="taskname">{{task.name}}</span> 
            </mat-panel-title>
            <mat-panel-description>
              <button mat-stroked-button color="primary" (click)="removeTask(task.id, true)">concluída
                <mat-icon>check_circle</mat-icon>
              </button>
            </mat-panel-description>
          </mat-expansion-panel-header>     
          <p matLine>Descrição: {{task.description}}</p>
          @if (task.image != null) {<img [src]="task.image"> }
        </mat-expansion-panel>
      }
    </mat-accordion>
  </mat-tab>
  <mat-tab label="Concluidas"> 
    <mat-accordion>
      @for (task of getCompletedTasks() ; track $index) {
        <mat-expansion-panel [class.due-tomorrow]="isDueTomorrow(task.deadline)"
          [class.overdue]="isOverdue(task.deadline)">
          <mat-expansion-panel-header>
            <mat-panel-title>
              <span class="dateTask"> {{task.deadline | date: 'dd/MM/yyyy'}}</span>
              <span class="taskname">{{task.name}}</span> 
            </mat-panel-title>
            <mat-panel-description>
              <mat-icon>check_circle</mat-icon>
            </mat-panel-description>
          </mat-expansion-panel-header>     
          <p matLine>Descrição: {{task.description}}</p>
          @if (task.image != null) {<img [src]="task.image"> }
        </mat-expansion-panel>
      }
    </mat-accordion>
  </mat-tab>
</mat-tab-group>

  `,
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {
  title = 'Lista de tarefas';
  tasks: any[] = [];
  taskName = '';
  taskDescription = '';
  taskDeadline = '';
  taskImage: Blob | null = new Blob();
  taskId: string = '';

  constructor(private indexedDbService: IndexedDbService, private dialog: MatDialog) {}

  ngOnInit() {
    this.indexedDbService.getTasks().then(tasks => this.tasks = tasks);
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: { task: {} }
    });

    dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
      if (result) {
        const task = result.task;
        this.tasks.push(task);
        this.indexedDbService.addTask(task);
      }
    });
  }

  removeTask(taskId: number, completed: boolean): void {
    this.indexedDbService.updateTaskCompletedStatus(taskId, completed).then(() => {
      console.log('Status da tarefa atualizado no IndexedDB');
      const taskToUpdate = this.tasks.find(task => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.completed = completed;
      }
    }).catch((error) => {
      console.error('Erro ao atualizar o status da tarefa no IndexedDB:', error);
    });
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.taskImage = new Blob([new Uint8Array((e.target?.result as ArrayBuffer))]);
    };
    reader.readAsArrayBuffer(file);
  }

  isOverdue(taskDeadline: Date): boolean {
    return new Date() > new Date(taskDeadline);
  }

  isDueTomorrow(taskDeadline: Date): boolean {
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return tomorrow.toDateString() === new Date(taskDeadline).toDateString();
  }

  getPendingTasks(): any[] {
    return this.tasks.filter(task => !task.completed);
  }

  getCompletedTasks(): any[] {
    return this.tasks.filter(task => task.completed);
  }
}