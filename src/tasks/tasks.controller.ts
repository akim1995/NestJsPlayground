import { Controller, Get, Post, Body, Param, Delete, Put, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { };
  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto) {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id')
  updateTaskById(@Param('id') id: string, @Body('status') status: TaskStatus): Task | null {
    return this.tasksService.updateTask(id, status);
  }
}
