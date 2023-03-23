import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): any[] {
    return this.todosService.findAll();
  }

  @Post()
  createTodo(@Body() newTodo: CreateTodoDto) {
    this.todosService.createTodo(newTodo);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Todo {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() todoToUpdate: CreateTodoDto) {
    return this.todosService.update(id, todoToUpdate);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }
}
