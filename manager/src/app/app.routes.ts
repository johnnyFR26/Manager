import { Routes } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list/to-do-list.component';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
    {path: 'clients', component: TableComponent},
    { path: 'tasks', component: ToDoListComponent },
    //{path: '', component: AppComponent},

];
