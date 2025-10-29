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
    const updatedTasks = [task, ...this.tasks.value];
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

  logout(): void {
    localStorage.removeItem('tasks');
  }
}
