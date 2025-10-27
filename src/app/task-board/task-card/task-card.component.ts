import { Component, input, Signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe, DragDropModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  task = input.required<Task>();
}
