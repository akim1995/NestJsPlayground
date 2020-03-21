import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status)
    }
    if (search) {
      tasks = tasks.filter(task => {
        return task.title.includes(search)
          || task.description.includes(search);
      })
    }
    return tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task);
    return task;
  }
  getTaskById(id: string) {
    const found = this.tasks.find(task => task.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  deleteTaskById(id: string) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
  updateTask(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    if (task) {
      task.status = status;
      return task;
    }
  }
}
