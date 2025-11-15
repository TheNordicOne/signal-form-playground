import { Component, signal } from '@angular/core';
import { initialMaintenanceRequest, MaintenanceRequest } from '../../model/maintenance-request';
import { Field } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { ValidationErrors } from '../validation-errors/validation-errors';
import {
  applyWhenValue,
  form,
  minLength,
  required,
  validateBuildingExists,
  validateRoomExists,
} from './wrapper';

@Component({
  selector: 'app-proposed',
  imports: [Field, FormsModule, ValidationErrors],
  templateUrl: './alternative-a.html',
  host: {
    class: 'form-wrapper',
  },
})
export class AlternativeA {
  request = signal<MaintenanceRequest>({ ...initialMaintenanceRequest });

  /*
  Alternative A

  ***Pros:**
  - fully declarative
    - all validators for a given field are immediately visible
  - fields are not repeated
  - which field is targeted when using applyWhenValue is clear


  ***Cons:**
  - longer in terms of lines to write
  - readability can be hindered
    - may depend a little on the formatting
    - also depends on how nested fields can be accessed
  - requires a reserved key to add validators to the whole form
    - reserved keys have potential to collide with one required for business logic
  - applyWhenValue now only targets a single field, which may lead to repetitive boolean checks
*/
  requestForm = form(this.request, {
    buildingNumber: [
      required({ message: 'Please enter the room number' }),
      minLength(2),
      validateBuildingExists(),
    ],
    roomNumber: [required({ message: 'Please enter the room number' }), minLength(2)],
    fullName: [required()],
    email: [required()],
    'details.category': [required()],
    'details.description': [required()],
    phone: [
      applyWhenValue(
        (request) => request.details.urgency === 'high' || request.details.urgency === 'critical',
        [
          required({
            message: 'For urgent requests, please enter your phone number so we can call you back!',
          }),
        ],
      ),
    ],
    root: [validateRoomExists()],
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.requestForm().value());
  }
}
