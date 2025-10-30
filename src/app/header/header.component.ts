import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TaskService } from '../services/task.service';
import { constants } from '../constants/constants';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  taskService = inject(TaskService);

  readonly constants = constants;

  logout(): void {
    this.taskService.logout();
  }
}
