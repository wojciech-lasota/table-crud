import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  ngOnInit(): void {
    this.buttonStyle = 'p-button';
  }
  routes = NAVIGATION_ROUTES;
  buttonStyle = ''; //todo
}
export const NAVIGATION_ROUTES = [
  {
    name: 'Add task',
    path: '/task-add',
    icon: 'pi pi-plus-circle',
  },
  {
    name: 'Tasks list',
    path: '/tasks-list',
    icon: 'pi pi-database',
  },
];
//  icon={{route.icon}}
