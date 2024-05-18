import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todos.dto';
// import { Request } from 'express';
// import { TodoE } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/create')
  async create(@Body()dto:TodoDto) {
     return this.todoService.create(dto);
  }

  @Post ('byDate/:Status/:StartDate/:CompletedDate')
  async getDataByDate (
    @Param('Status') Status:string,
    @Param('StartDate') StartDate:Date,
    @Param('CompletedDate') CompletedDate:Date,
  ) {
    return this.todoService.getDataByDate(Status,StartDate,CompletedDate);
  }

  @Post('readAll')
async findAll(
  @Body('status') status: string,
  @Body('page') page: number = 1,
  @Body('limit') limit: number = 10,
) {
  if (status) {
    return await this.todoService.findBy(status, page, limit);
  } else {
    return await this.todoService.findMany(page, limit);
  }
}

   @Post('readone/:id')
  async findOne(@Param('id') id: number) {
    return await this.todoService.findOne(id);
  }

  @Post('update/:id')
  async update(@Param('id') id: number, @Body() TodoDto: TodoDto) {
    return await this.todoService.update(id, TodoDto);
  }

  @Post('delete/:id')
   async delete(@Param('id') id: number) {
    return this.todoService.delete(id);
  }
}
