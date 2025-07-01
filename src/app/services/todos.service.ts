import { BehaviorSubject, ReplaySubject, Subject, tap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';
import { Observable, shareReplay, switchMap } from 'rxjs';

const todosFromServer: Todo[] = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Vue.js', completed: false },
];

const USER_ID = 1988;
const API_URL = 'https://mate.academy/students-api';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  refresh$$ = new BehaviorSubject(null);
  todos$: Observable<Todo[]>;

  constructor(
    private http: HttpClient,
  ) { 
    this.todos$ = this.refresh$$.pipe(
      switchMap(() => this.getTodos()),
    )
  }

  getTodos() {
    return this.http.get<Todo[]>(`${API_URL}/todos?userId=${USER_ID}`);
      // .pipe(
      //   tap(todos => {
      //     this.todos$$.next(todos)
      //   }),
      // );
  }

  createTodo(title: string) {
    return this.http.post<Todo>(`${API_URL}/todos`, {
      title,
      userId: USER_ID,
      completed: false,
    })
      .pipe(
        tap(() => this.refresh$$.next(null)),
      )
  }

  updateTodo(todo: Todo) {
    return this.http.patch<Todo>(`${API_URL}/todos/${todo.id}`, todo)
      .pipe(
        tap(() => this.refresh$$.next(null)),
      );
  }

  deleteTodo(todo: Todo) {
    return this.http.delete<Todo>(`${API_URL}/todos/${todo.id}`)
      .pipe(
        tap(() => this.refresh$$.next(null)),
      )
  }
}
