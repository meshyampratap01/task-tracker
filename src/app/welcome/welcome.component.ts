import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { constants } from '../constants/constants';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  readonly welcomeConstants = constants;
}
