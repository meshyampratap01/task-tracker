import { Component, input, InputSignal } from '@angular/core';

import { Task } from '../../models/task.model';
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
  selector: 'app-task-column',
  imports: [TaskCardComponent],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss'
})
export class TaskColumnComponent {
  tasks: InputSignal<Task[]> = input.required<Task[]>();
  label: InputSignal<string> = input.required<string>();
}
