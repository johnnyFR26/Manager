import { Routes } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list/to-do-list.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: 'clients', component: AppComponent},
    { path: 'tasks', component: ToDoListComponent },
];
