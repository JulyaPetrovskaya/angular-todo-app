import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './types/todo';

const todos = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Vue.js', completed: false },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
  
export class AppComponent {
  todos = todos;
  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
      Validators.required,
      Validators.minLength(3),
      ]
    }),
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }


  get activeTodos() {
    // get — це геттер, тобто властивість,
    // яку ми читаємо як змінну, а не викликаємо як функцію

    return this.todos.filter((todo) => !todo.completed);
    // отримаємо масив незавершених задач — фільтрує всі елементи
    // масиву todos, залишаючи лише ті,
    // в яких todo.completed === false
  }

  addTodo() {
    if (this.todoForm.invalid) {
      return;
    }
    // якщо title не порожній, то створюємо новий об'єкт Todo
    const newTodo: Todo = {
      id: Date.now(),
      title: this.title.value as string,
      completed: false,
    };
    // створюємо новий об'єкт Todo
    this.todos.push(newTodo);
    this.todoForm.reset();
  }
}
