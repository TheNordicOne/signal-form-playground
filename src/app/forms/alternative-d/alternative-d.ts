import { Component, signal } from '@angular/core';
import { initialMaintenanceRequest, MaintenanceRequest } from '../../model/maintenance-request';
import {
  applyWhenValue,
  form,
  minLength,
  required,
  validateBuildingExists,
  validateRoomExists,
} from './wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrors } from '../validation-errors/validation-errors';
import { Field } from '@angular/forms/signals';

@Component({
  selector: 'app-alternative-d',
  imports: [FormsModule, ReactiveFormsModule, ValidationErrors, Field],
  templateUrl: './alternative-d.html',
  styles: ``,
})
export class AlternativeD {
  request = signal<MaintenanceRequest>({ ...initialMaintenanceRequest });

  /*
    Alternative D

    This alternative makes the assumption, that a validator function always has access to
    the whole form context, to be able to do cross-field validation

    ***Pros:**
    - fully declarative
      - all validators for a given field are immediately visible
    - fields are not repeated
    - defining validators for form groups uses the exact shape as the value
    - which field is targeted when using applyWhenValue is clear
    - doing cross-field validation does not require special functions
    - conditions can be defined once and reused across multiple fields
      - applyWhenValue can reference a condition by key instead of repeating the predicate

    ***Cons:**
    - requires a reserved key to add validators to the whole form
      - reserved keys have potential to collide with one required for business logic
    - applyWhenValue now only targets a single field (but condition reuse mitigates repetition)
  */
  requestForm = form(this.request, {
    conditions: {
      isUrgent: (request: MaintenanceRequest) =>
        request.details.urgency === 'high' || request.details.urgency === 'critical',
    },
    validators: {
      buildingNumber: [
        required({ message: 'Please enter the building number' }),
        minLength(2, { message: 'Must have at least 2 characters' }),
        validateBuildingExists(),
      ],
      roomNumber: [
        required({ message: 'Please enter the room number' }),
        minLength(2),
        validateRoomExists(),
      ],
      fullName: [required()],
      details: {
        category: [required()],
        description: [required()],
      },
      email: [required()],
      phone: [
        applyWhenValue('isUrgent', [
          required({
            message: 'For urgent requests, please enter your phone number so we can call you back!',
          }),
        ]),
      ],
      root: [],
    },
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.requestForm().value());
  }
}
