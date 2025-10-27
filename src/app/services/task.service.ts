import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>(this.loadTasks());
  tasks$: Observable<Task[]> = this.tasks.asObservable();

  private loadTasks(): Task[] {
    const tasksJson = localStorage.getItem('tasks');
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks(): Task[] {
    return this.tasks.value;
  }

  addTask(task: Task): void {
    const updatedTasks = [...this.tasks.value, task];
    this.tasks.next(updatedTasks);
    this.saveTasks(updatedTasks);
  }

  updateTask(updatedTask: Task): void {
    const updatedTasks = this.tasks.value.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasks.next(updatedTasks);
    this.saveTasks(updatedTasks);
  }

  deleteTask(taskId: string): void {
    const updatedTasks = this.tasks.value.filter((task) => task.id !== taskId);
    this.tasks.next(updatedTasks);
    this.saveTasks(updatedTasks);
  }

  putTasks(): void {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Sample Task',
        description: 'This is a sample task.',
        status: 'todo',
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Another Task',
        description: 'This is another sample task.',
        status: 'in-progress',
        createdAt: new Date(),
      },
      {
        id: '3',
        title: 'Completed Task',
        description: 'This task is completed.',
        status: 'done',
        createdAt: new Date(),
      },
      {
        id: '4',
        title: 'Fourth Task',
        description: 'This is the fourth sample task.',
        status: 'todo',
        createdAt: new Date(),
      },
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasks.next(this.loadTasks());
  }

  logout(): void {
    localStorage.removeItem('tasks');
  }
}
