import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { welcomePageStrings } from '../constants/welcome-page/welcome-page-constants';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  readonly welcomeConstants = welcomePageStrings;
}
