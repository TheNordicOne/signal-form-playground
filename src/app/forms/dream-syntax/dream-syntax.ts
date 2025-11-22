import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrors } from '../validation-errors/validation-errors';
import { initialMaintenanceRequest, MaintenanceRequest } from '../../model/maintenance-request';

import { minLength, required } from '../mock';
import { buildingExists, form, roomExists, whenValue } from './mock';
import { isUrgent } from './conditions';

@Component({
  selector: 'app-personal-ideal',
  imports: [FormsModule, ReactiveFormsModule, ValidationErrors],
  templateUrl: './dream-syntax.html',
})
export class DreamSyntax {
  request = signal<MaintenanceRequest>({ ...initialMaintenanceRequest });

  /*
    Dream Syntax

    ***Pros:**
    - fully declarative
      - all validators for a given field are immediately visible
    - fields are not repeated
    - which field is targeted when using whenValue is clear
    - doing cross-field validation does not require special functions
    - conditions can be defined once and reused across multiple fields

    ***Cons:**
    - whenValue now only targets a single field (but condition reuse mitigates repetition)
    - implementation is probably not easy or has high complexity
  */
  requestForm = form(this.request, (path) => {
    // Note: isUrgent is a custom function defined outside of this component

    path.buildingNumber.validate(
      required({ message: 'Please enter the building number' }),
      minLength(2, { message: 'Must have at least 2 characters' }),
      buildingExists(),
    );

    path.roomNumber.validate(
      required({ message: 'Please enter the room number' }),
      minLength(2),
      roomExists(),
    );

    path.fullName.validate(required());

    path.details.category.validate(required());

    path.details.description.validate(required());

    path.email.validate(required());

    path.phone.validate(
      whenValue(
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
