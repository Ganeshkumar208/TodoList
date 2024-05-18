import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoE } from './entities/todo.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TodoE])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
