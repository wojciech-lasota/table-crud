import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TodosService } from 'src/app/api/todo.service';

import { catchError, tap } from 'rxjs';
import { ITask, TaskStatus } from 'src/app/api/task';

@Component({
  selector: 'app-task-crud',
  templateUrl: './task-crud.component.html',
  styleUrls: ['./task-crud.component.scss'],
  providers: [],
})
export class TaskCrudComponent implements OnInit {
  task: ITask;
  tasks!: ITask[];
  taskDialog: boolean;
  submitted: boolean;

  selectedTasks: ITask[];

  constructor(
    private todosService: TodosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.todosService
      .getAll()
      .pipe(
        tap((tasks: ITask[]) => {
          this.tasks = [...tasks];
          console.log('load tasks', this.tasks);
        }),
        catchError((error) => {
          return error;
        })
      )
      .subscribe();
  }
  // MessageService
  addSingle() {
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }

  // MessageService
  addMultiple() {
    this.messageService.addAll([
      {
        severity: 'success',
        summary: 'Service Message',
        detail: 'Via MessageService',
      },
      {
        severity: 'info',
        summary: 'Info Message',
        detail: 'Via MessageService',
      },
    ]);
  }

  // MessageService
  clear() {
    this.messageService.clear();
  }
  openNew() {
    this.task = { status: TaskStatus.WAITING };
    this.submitted = false;
    this.taskDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected tasks?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tasks = this.tasks.filter(
          (task) => !this.selectedTasks.includes(task)
        );
        this.selectedTasks.map((task) =>
          this.todosService.delete(task._id).subscribe()
        );
        this.selectedTasks = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Tasks Deleted',
          life: 3000,
        });
      },
    });
  }
  editProduct(task: ITask) {
    this.task = { ...task };
    this.taskDialog = true;
  }

  deleteProduct(task: ITask) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + task.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tasks = this.tasks.filter((t) => t._id !== task._id);
        this.todosService.delete(task._id).subscribe();
        this.task = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.taskDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.task.title.trim()) {
      if (this.task._id) {
        const index = this.tasks.findIndex(
          (task) => task._id === this.task._id
        );

        if (index !== -1) {
          this.tasks[index] = this.task;
        }
        const { _id, ...rest } = this.task;
        this.todosService.update(rest, this.task._id).subscribe();
        this.messageService.add({
          key: 'completed',
          severity: 'success',
          summary: 'Successful',
          detail: 'Task updated',
        });
      } else {
        console.log('taki task', this.task);
        this.todosService.addTask(this.task).subscribe();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Task Created',
          life: 3000,
        });
      }
      //workaround
      setTimeout(() => {
        this.loadTasks();
      }, 500);
      this.taskDialog = false;
    }
    this.taskDialog = false;
    this.task = {};
  }
  completed(task: ITask) {
    const updatedTask = { ...task, status: TaskStatus.COMPLETED };
    const { _id, ...rest } = updatedTask;

    console.log(task);
    // const { _id, ...rest } = task;
    this.todosService
      .update(rest, task._id)
      .pipe(
        tap(() => {
          const index = this.tasks.findIndex((t) => t._id === task._id);
          if (index !== -1) {
            this.tasks[index] = task;
          }
          this.messageService.add({
            key: 'completed',
            severity: 'success',
            summary: 'Successful',
            detail: 'Task completed',
          });
          this.loadTasks();
        })
      )
      .subscribe();

    // this.tasks[task._id] = { task };
    console.log(this.tasks);
  }
  //todo delete
  logEvent(event: any) {
    console.log('event ', event);
  }
  handleClick(task: any) {
    console.log('task:', task);
    console.log('selectedProducts', this.selectedTasks);
  }
}
