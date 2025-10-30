import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { constants } from '../constants/constants';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private location: Location) {}

  readonly constants = constants;

  goBack(): void {
    this.location.back();
  }
  
}
