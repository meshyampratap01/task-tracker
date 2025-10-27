import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from "../header/header.component";
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { TaskColumnComponent } from "./task-column/task-column.component";

@Component({
  selector: 'app-task-board',
  imports: [HeaderComponent, TaskColumnComponent],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent implements OnInit {
  tasks: Task[] = [];

  columns =[
    {label: 'To Do', status: 'todo' },
    {label: 'In Progress', status: 'in-progress' },
    {label: 'Done', status: 'done' }
  ]

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.putTasks();
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  gettasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }
}
