import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrors } from '../validation-errors/validation-errors';
import { initialMaintenanceRequest, MaintenanceRequest } from '../../model/maintenance-request';
import { form } from './mock';
import { Field } from '@angular/forms/signals';
import {
  applyWhenValue,
  minLength,
  required,
  validateBuildingExists,
  validateRoomExists,
} from '../mock';

@Component({
  selector: 'app-alternative-f',
  imports: [FormsModule, ReactiveFormsModule, ValidationErrors, Field],
  templateUrl: './alternative-f.html',
})
export class AlternativeF {
  request = signal<MaintenanceRequest>({ ...initialMaintenanceRequest });

  /*
    Alternative F

    ***Pros:**
    - fully declarative
      - all validators for a given field are immediately visible
    - fields are not repeated
    - which field is targeted when using applyWhenValue is clear
    - doing cross-field validation does not require special functions
    - conditions can be defined once and reused across multiple fields

    ***Cons:**
    - applyWhenValue now only targets a single field (but condition reuse mitigates repetition)
    - implementation is probably not easy or has high complexity
  */
  requestForm = form(this.request, (path) => {
    const isUrgent = (request: MaintenanceRequest) =>
      request.details.urgency === 'high' || request.details.urgency === 'critical';

    path.buildingNumber.validate(
      required({ message: 'Please enter the building number' }),
      minLength(2, { message: 'Must have at least 2 characters' }),
      validateBuildingExists(),
    );

    path.roomNumber.validate(
      required({ message: 'Please enter the room number' }),
      minLength(2),
      validateRoomExists(),
    );

    path.fullName.validate(required());

    path.details.category.validate(required());

    path.details.description.validate(required());

    path.email.validate(required());

    path.phone.validate(
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
