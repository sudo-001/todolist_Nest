import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'todos app',
      description: 'Create NESTJS todo app',
      done: true,
    },
    {
      id: 2,
      title: 'bread',
      description: 'buy bread',
      done: false,
    },
    {
      id: 3,
      title: 'wine',
      description: 'buy wine',
      done: false,
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  createTodo(todo: CreateTodoDto) {
    this.todos = [...this.todos, todo];
  }

  findOne(id: string): Todo {
    return this.todos.find((todo) => todo.id === parseInt(id));
  }

  update(id: string, todoUpdate: Todo) {
    // we search for the todo we want to update
    const todoToUpdate = this.todos.find((t) => t.id === parseInt(id));

    if (!todoToUpdate) {
      return new NotFoundException('It seems like this object did not exist ');
    }

    // We granulatary change the field to update
    if (todoUpdate.hasOwnProperty('done')) {
      todoToUpdate.done = todoUpdate.done;
    }
    if (todoUpdate.title) {
      todoToUpdate.title = todoUpdate.title;
    }
    if (todoUpdate.description) {
      todoToUpdate.description = todoUpdate.description;
    }

    // Now we change the current todos table by adding the updated todo
    const updatedTodos = this.todos.map((t) =>
      t.id === parseInt(id) ? todoToUpdate : t,
    );

    this.todos = [...updatedTodos];
    return { updatedTodos: 1, todoUpdated: updatedTodos };
  }

  deleteTodo(id: string) {
    const nbTodos = this.todos.length;
    this.todos = [...this.todos.filter((t) => t.id !== parseInt(id))];

    if (this.todos.length < nbTodos) {
      return { deletedTodos: 1, nbTodos: this.todos.length };
    } else {
      return { deletedTodos: 0, nbTodos: nbTodos };
    }
  }
}
