import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskAddComponent } from './main/task-add/task-add.component';
import { TaskCrudComponent } from './main/task-crud/task-crud.component';
import { TaskDetailsComponent } from './main/task-details/task-details.component';
import { TasksListComponent } from './main/tasks-list/tasks-list.component';

const routes: Routes = [
  { path: 'task-add', component: TaskAddComponent },
  { path: 'tasks-list', component: TasksListComponent },
  { path: 'task-details/:id', component: TaskDetailsComponent },
  { path: 'crud', component: TaskCrudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
