import { Component, DestroyRef, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { HeaderComponent } from '../header/header.component';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { TaskColumnComponent } from './task-column/task-column.component';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-task-board',
  imports: [
    HeaderComponent,
    TaskColumnComponent,
    DragDropModule,
    AddTaskComponent,
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss',
})
export class TaskBoardComponent implements OnInit {
  tasks: Task[] = [];

  columns: { label: string; status: 'todo' | 'in-progress' | 'done' }[] = [
    { label: 'To Do', status: 'todo' },
    { label: 'In Progress', status: 'in-progress' },
    { label: 'Done', status: 'done' },
  ];

  constructor(
    private taskService: TaskService,
    private destroyref: DestroyRef
  ) {}

  ngOnInit(): void {
    const taskSubscription = this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });

    this.destroyref.onDestroy(() => {
      taskSubscription.unsubscribe();
    });
  }

  gettasksByStatus(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  onDrop(
    event: CdkDragDrop<Task[]>,
    newStatus: 'todo' | 'in-progress' | 'done'
  ): void {
    console.log('Drop event:', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const updatedTask: Task = {
        ...task,
        status: newStatus,
        updatedAt: new Date(),
      };
      this.taskService.updateTask(updatedTask);
    }
  }
}
