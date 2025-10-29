import { Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: WelcomeComponent,
    },
    {
        path: 'tasks',
        component: TaskBoardComponent,
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
