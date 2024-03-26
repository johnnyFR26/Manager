import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../to-do-list/to-do-list/Task.model';


@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  template: `
    <mat-form-field>
      <mat-label>Title</mat-label>
      <input matInput cdkFocusInitial [(ngModel)]="data.task.title" />
    </mat-form-field>
    
    <mat-form-field>
      <mat-label>Description</mat-label>
      <textarea matInput [(ngModel)]="data.task.description"></textarea>
    </mat-form-field>

    <mat-form-field>
      <mat-label>Deadline</mat-label>
      <input matInput [(ngModel)]="data.task.deadline" type="date" />
    </mat-form-field>
    
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="{ task: data.task }">OK</button>
      <button mat-button (click)="cancel()">Cancel</button>
      <button
        *ngIf="data.enableDelete"
        mat-fab
        color="primary"
        aria-label="Delete"
        [mat-dialog-close]="{ task: data.task, delete: true }">
        <mat-icon>delete</mat-icon>
      </button>
    </div>
  `,
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData 
  ) {}

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.data.task.deadline = this.backupTask.deadline; // Restore the deadline as well
    this.dialogRef.close(this.data);
  }
}

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
