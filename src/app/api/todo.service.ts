import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITask } from './task';

@Injectable({
  providedIn: 'root',
})
export class TodosService implements OnInit {
  private apiKey = '4abb7115e658468e9cb4d66adc5e5ddb';
  private apiURL = 'https://crudcrud.com/api/' + this.apiKey;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': ' application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {}

  getAll(): Observable<ITask[]> {
    return this.httpClient.get<ITask[]>(this.apiURL + '/todos/');
  }

  addTask(task: ITask): Observable<ITask> {
    return this.httpClient.post<ITask>(
      this.apiURL + '/todos/',
      JSON.stringify(task),
      this.httpOptions
    );
  }
  update(task: ITask, id: string): Observable<ITask> {
    return this.httpClient.put<ITask>(this.apiURL + '/todos/' + id, task);
  }
  delete(taskId: string): Observable<ITask> {
    return this.httpClient.delete<ITask>(
      this.apiURL + '/todos/' + taskId,
      this.httpOptions
    );
  }
  // getTaskById(id: string): Observable<ITask> {
  //   return this.httpClient.get<ITask>(this.apiURL + '/todos/' + id);
  // }

  // setKey(key: string) {
  //   this.apiKey = key;
  //   this.apiURL = `https://crudcrud.com/api/${this.apiKey}`;
  // }
  // getKey(): string {
  //   return `https://crudcrud.com/api/${this.apiKey}/todos/`;
  // }
  // getNumberOfRequests() {
  //   fetch(`https://crudcrud.com/Dashboard/${this.apiKey}`)
  //     .then((response) => response.text())
  //     .then((html) => {
  //       const parser = new DOMParser();
  //       const doc = parser.parseFromString(html, 'text/html');
  //       const targetDiv = doc.querySelector('.column .dashboard-box .title')!;
  //       if (targetDiv.textContent === '100 / 100') {
  //         console.log('%c' + targetDiv.textContent, 'color: red');
  //       } else {
  //         console.log('%c' + targetDiv.textContent, 'color: green');
  //       }
  //     });
  // }
}
