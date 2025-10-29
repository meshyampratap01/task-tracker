import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('taskForm') taskFormRef!: NgForm;
  title = '';
  description = '';
  formSubmitted = false;

  constructor(private taskService: TaskService) {}

  open() {
    this.reset();
    this.formSubmitted = false;
    try {
      this.dialogRef?.nativeElement?.showModal();
    } catch (e) {
      const dlg = this.dialogRef?.nativeElement;
      if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
    }
  }

  close() {
    try {
      this.dialogRef?.nativeElement?.close();
    } catch (e) {
      const dlg = this.dialogRef?.nativeElement;
      if (dlg && typeof dlg.close === 'function') dlg.close();
    }
  }

  reset() {
    this.taskFormRef.resetForm();
    this.title = '';
    this.description = '';
  }

  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    if (!form.valid) {
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      title: this.title.trim(),
      description: this.description ? this.description.trim() : undefined,
      status: 'todo',
      createdAt: new Date(),
    };

    this.taskService.addTask(newTask);
    this.close();
  }

  onDialogClick(event: MouseEvent) {
    if (event.target === this.dialogRef?.nativeElement) {
      this.close();
    }
  }
}
