import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { ITask } from 'src/app/api/task';

import { TodosService } from '../../api/todo.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
})
export class TaskAddComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private todosService: TodosService) {}
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addTask();
      (event.target as HTMLInputElement).blur();
    } else if (event.key === 'Escape') {
      this.resetForm();
    }
  }
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      formError: '',
    });
  }
  addTask() {
    const { valid, invalid } = this.taskForm;
    if (valid) {
      const { title, description } = this.taskForm.value;
      const task: ITask = {
        title,
        description,
      };
      this.todosService
        .addTask(task)
        .pipe(
          tap(() => {
            this.resetForm();
          })
        )
        .subscribe();
    }
    if (invalid) {
      this.taskForm.get('formError')?.setValue('Please fill in all fields');
    }
  }

  resetForm() {
    this.taskForm.reset();
    // this.router.navigate(['/']);//todo
  }
}
