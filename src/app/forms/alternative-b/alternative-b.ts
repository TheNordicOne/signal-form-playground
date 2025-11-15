import { Component, signal } from '@angular/core';
import { initialMaintenanceRequest, MaintenanceRequest } from '../../model/maintenance-request';
import { Field, form } from '@angular/forms/signals';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrors } from '../validation-errors/validation-errors';

@Component({
  selector: 'app-alternative-b',
  imports: [FormsModule, ReactiveFormsModule, ValidationErrors, Field],
  templateUrl: './alternative-b.html',
})
export class AlternativeB {
  request = signal<MaintenanceRequest>({ ...initialMaintenanceRequest });

  /*
    Alternative B

    ***Pros:**


    ***Cons:**

  */
  requestForm = form(this.request, (path) => {});

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.requestForm().value());
  }
}
