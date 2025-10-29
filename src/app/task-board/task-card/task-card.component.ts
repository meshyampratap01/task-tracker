import { Component, inject, input, Signal } from '@angular/core';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ConfirmDialog } from 'primeng/confirmdialog';

import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-task-card',
  imports: [
    DatePipe,
    DragDropModule,
    FormsModule,
    NgClass,
    TitleCasePipe,
    ConfirmDialog,
  ],
  providers: [ConfirmationService],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  task = input.required<Task>();
  
  private taskService = inject(TaskService);
  private confirmationService = inject(ConfirmationService);

  onDeleteTask(): void {
    this.confirmationService.confirm({
      message: `Delete task with title "${this.task().title}"?`,
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'No',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Yes',
      },
      accept: () => {
        this.taskService.deleteTask(this.task().id);
      },
    });
  }
}
