import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { constants } from '../../constants/constants';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('taskForm') taskFormRef!: NgForm;

  readonly constants = constants;

  title: string = '';
  description: string = '';

  formSubmitted: boolean = false;

  constructor(private taskService: TaskService) {}

  open(): void {
    this.reset();
    this.formSubmitted = false;
    this.dialogRef?.nativeElement?.showModal();
  }

  close(): void {
    this.dialogRef?.nativeElement?.close();
  }

  reset(): void {
    this.taskFormRef.resetForm();
    this.title = '';
    this.description = '';
  }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (!form.valid) {
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: this.title.trim(),
      description: this.description ? this.description.trim() : undefined,
      status: 'todo',
      createdAt: new Date(),
    };

    this.taskService.addTask(newTask);
    this.close();
  }

  onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialogRef?.nativeElement) {
      this.close();
    }
  }
}
