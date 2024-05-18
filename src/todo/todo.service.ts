import { Injectable } from '@nestjs/common';
import { TodoE } from './entities/todo.entity';
import { TodoDto } from './dto/todos.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { error } from 'console';


@Injectable()
export class TodoService {
  constructor (@InjectRepository (TodoE) private readonly todoRepository:Repository<TodoE>) {}
  
  async create(data:TodoDto) {
    const todo =this.todoRepository.create(data);
    return await this.todoRepository.save(todo)
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    return await this.todoRepository.findOne({where:{id}});
  }
  
  async delete(id: number) {
    const todo = await this.todoRepository.findOne({where:{id}});
    return await this.todoRepository.remove(todo);
  }

  async update(id: number, dto: TodoDto) {
    const todos =  await this.todoRepository.findOne({where:{id}});
    if (todos) {
      todos.Activity = dto.Activity;
      todos.Status = dto.Status;
      todos.DateToComplete = dto.DateToComplete;
      todos.StartDate = dto.StartDate;
      todos.StartTime = dto.StartTime;
      todos.CompletedDate = dto.CompletedDate;
      todos.CompletedTime = dto.CompletedTime;
      return await this.todoRepository.save(todos);
    }else {
      throw new error("this item is not found");
    }
  }
  async findBy(Status: string, page: number = 1, limit: number = 10) {
    const options: FindManyOptions<TodoE> = {
      where: { Status },
      skip: (page - 1) * limit,
      take: limit,
    };
    const [todos, totalCount] = await this.todoRepository.findAndCount(options);
    const totalPages = Math.ceil(totalCount / limit);
    return { todos, totalCount, totalPages, currentPage: page };
  }

  async findMany(page: number = 1, limit: number = 10) {
    const options: FindManyOptions<TodoE> = {
      skip: (page - 1) * limit,
      take: limit,
    };
    const [todos, totalCount] = await this.todoRepository.findAndCount(options);
    const totalPages = Math.ceil(totalCount / limit);
    return { todos, totalCount, totalPages, currentPage: page };
  }

  async getDataByDate(Status: string, StartDate: Date, CompletedDate: Date) {
    if (Status === 'Inprogress') {
    return await this.todoRepository
    .createQueryBuilder('TodoE')
      .where('TodoE.Status = :Status', { Status })
      .andWhere('TodoE.StartDate >= :StartDate', { StartDate })
      .andWhere('TodoE.StartDate <= :CompletedDate', { CompletedDate })
      .getMany();
    } else if ( Status === "Completed") {
      return await this.todoRepository
      .createQueryBuilder('TodoE')
        .where('TodoE.Status = :Status', { Status })
        .andWhere('TodoE.StartDate >= :StartDate', { StartDate })
        .andWhere('TodoE.CompletedDate <= :CompletedDate', { CompletedDate })
        .getMany();
    } else {
      throw new Error ('invalid status provided')
    }
  }
}
