import { Component, input, InputSignal, signal, computed } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';

import { Task } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { taskBoardConstants } from '../../constants/task-board-page/task-board-page-constants';

@Component({
  selector: 'app-task-column',
  imports: [TaskCardComponent, CdkDrag, NgClass],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss',
})
export class TaskColumnComponent {
  tasks: InputSignal<Task[]> = input.required<Task[]>();
  label: InputSignal<string> = input.required<string>();

  searchTerm = signal('');

  filteredTasks = computed(() => {
    const q = this.searchTerm().trim().toLowerCase();
    const all = this.tasks();
    if (!q) return all;
    return all.filter((t) => {
      const title = (t.title || '').toString().toLowerCase();
      const desc = (t.description || '').toString().toLowerCase();
      return title.includes(q) || desc.includes(q);
    });
  });

  onSearch(value: string) {
    this.searchTerm.set(value || '');
  }

  onSearchBlur() {
    this.searchTerm.set('');
  }

}
