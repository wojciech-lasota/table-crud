import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/api/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {
  task: ITask;
  selectedProducts: any;

  constructor(private route: ActivatedRoute) {
    this.task = history.state.task;
    console.log(this.task);
  }
}
