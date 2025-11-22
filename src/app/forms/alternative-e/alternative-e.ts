import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrors } from '../validation-errors/validation-errors';
import { initialMaintenanceRequest, MaintenanceRequest } from '../../model/maintenance-request';
import {
  applyWhenValue,
  minLength,
  required,
  validateBuildingExists,
  validatePath,
  validateRoomExists,
} from './wrapper';
import { Field, form } from '@angular/forms/signals';

@Component({
  selector: 'app-alternative-e',
  imports: [FormsModule, ReactiveFormsModule, ValidationErrors, Field],
  templateUrl: './alternative-e.html',
})
export class AlternativeE {
  request = signal<MaintenanceRequest>({ ...initialMaintenanceRequest });

  /*
    Alternative E

    ***Pros:**
    - fully declarative
      - all validators for a given field are immediately visible
    - fields are not repeated
    - which field is targeted when using applyWhenValue is clear
    - doing cross-field validation does not require special functions
    - conditions can be defined once and reused across multiple fields

    ***Cons:**
    - applyWhenValue now only targets a single field (but condition reuse mitigates repetition)
    - calling validatePath at the start of the line adds noise and may decrease readability a bit
  */
  requestForm = form(this.request, (path) => {
    const isUrgent = (request: MaintenanceRequest) =>
      request.details.urgency === 'high' || request.details.urgency === 'critical';

    validatePath(
      path.buildingNumber,
      required({ message: 'Please enter the building number' }),
      minLength(2, { message: 'Must have at least 2 characters' }),
      validateBuildingExists(),
    );

    validatePath(
      path.roomNumber,
      required({ message: 'Please enter the room number' }),
      minLength(2),
      validateRoomExists(),
    );

    validatePath(path.fullName, required());

    validatePath(path.details.category, required());

    validatePath(path.details.description, required());

    validatePath(path.email, required());

    validatePath(
      path.phone,
      applyWhenValue(
        isUrgent,
        required({
          message: 'For urgent requests, please enter your phone number so we can call you back!',
        }),
      ),
    );
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.requestForm().value());
  }
}
