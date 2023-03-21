import { Component } from '@angular/core';
import { ITask } from 'src/app/api/task';
import { TodosService } from 'src/app/api/todo.service';
import { catchError, Subscription, tap, throwError } from 'rxjs';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {
  tasks: ITask[] = [];

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  constructor(private todosService: TodosService, private router: Router) {}
  ngOnInit(): void {
    this.loadTasks();
  }
  ngAfterViewInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.todosService
      .getAll()
      .pipe(
        tap((tasks: ITask[]) => {
          this.tasks = [...tasks];
        }),
        catchError((error) => {
          console.log(error);
          return error; //TODO ?
        })
      )
      .subscribe();
  }
  removeTask(task: ITask) {
    console.log('delete task ', task);
    this.todosService.delete(task._id!).subscribe(() => {
      this.loadTasks();
    });
  }
  viewTaskDetails(task: ITask) {
    console.log('viewTaskDetails ', task);
    this.router.navigate(['/task-details', task._id], { state: { task } });
  }
}
