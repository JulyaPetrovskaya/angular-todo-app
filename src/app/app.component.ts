import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './types/todo';

const todosFromServer = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Vue.js', completed: false },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  _todos: Todo[] = [];
  activeTodos: Todo[] = [];

  get todos() {
     // get — це геттер, тобто властивість,
     // яку ми читаємо як змінну, а не викликаємо як функцію
    return this._todos;
  }

  set todos(todos: Todo[]) {
    if (todos === this._todos) {
      return;
    }
    this._todos = todos;
  
    this.activeTodos = this._todos.filter((todo) => !todo.completed);
    // отримаємо масив незавершених задач — фільтрує всі елементи
    // масиву todos, залишаючи лише ті,
    // в яких todo.completed === false
  }

  constructor() { }
  
  ngOnInit(): void {
    this.todos = todosFromServer;
  }
  
  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  handleFormSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    this.addTodo(this.title.value);
    this.todoForm.reset();
  }

  addTodo(newTitle: string) {
    // якщо title не порожній, то створюємо новий об'єкт Todo
    const newTodo: Todo = {
      id: Date.now(),
      title: this.title.value as string,
      completed: false,
    };
      // створюємо новий об'єкт Todo
    this.todos = [
      ...this.todos,
      newTodo,
    ];
  }

  renameTodo(todoId: number, title: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }
      return {...todo, title};
    });
  }

  toggleTodo(todoId: number) {
    this.todos = this.todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }
      return {...todo, completed: !todo.completed};
    });
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }
}
