import { Component, input, InputSignal, signal, computed } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Task } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-column',
  imports: [TaskCardComponent, CdkDrag, NgClass, FormsModule],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss',
})
export class TaskColumnComponent {
  tasks: InputSignal<Task[]> = input.required<Task[]>();
  label: InputSignal<string> = input.required<string>();

  searchTerm = signal('');

  filteredTasks = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();
    const allTasks = this.tasks();
    if (!query) return allTasks;
    return allTasks.filter((task) => {
      const title = (task.title || '').toString().toLowerCase();
      const desc = (task.description || '').toString().toLowerCase();
      return title.includes(query) || desc.includes(query);
    });
  });

  onSearch(value: string): void {
    this.searchTerm.set(value || '');
  }

  onSearchBlur(): void {
    this.searchTerm.set('');
  }
}
