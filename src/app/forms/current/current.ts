import { Component, signal } from '@angular/core';
import { initialMaintenanceRequest, MaintenanceRequest } from '../../model/maintenance-request';
import { applyWhenValue, Field, form, minLength, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { validateBuildingExists, validateRoomExists } from '../../validators/maintance';
import { ValidationErrors } from '../validation-errors/validation-errors';

@Component({
  selector: 'app-current',
  imports: [Field, FormsModule, ValidationErrors],
  templateUrl: './current.html',
  host: {
    class: 'form-wrapper',
  },
})
export class Current {
  request = signal<MaintenanceRequest>({ ...initialMaintenanceRequest });

  /*
    21.0.0-next.0

    ***Pros:**
    - short
    - flexible
      e.g.: team can decide if to group validators by field (path.roomNumber) or by kind (required/minLength; like in this example)

    ***Cons:**
    - repetitive field selection (path.something)
    - not fully declarative, as validators can be in any order
      - e.g.: to ensure you find all validators for roomNumber you must look through ALL validators
    - ordering/grouping of validators is not enforced and therefore likely to get mixed up or overlooked
      - e.g.: a dev might not see there already is a validator for minLength and just add a second one  in a different place)
  */
  requestForm = form(this.request, (path) => {
    required(path.buildingNumber, { message: 'Please enter the room number' });
    required(path.roomNumber, { message: 'Please enter the room number' });
    required(path.fullName);
    required(path.details.category);
    required(path.details.description);
    required(path.email);

    minLength(path.buildingNumber, 2, { message: 'Must have at least 2 characters' });
    minLength(path.roomNumber, 2, { message: 'Must have at least 2 characters' });

    validateBuildingExists(path.buildingNumber);
    validateRoomExists(path);

    applyWhenValue(
      path,
      (request) => request.details.urgency === 'high' || request.details.urgency === 'critical',
      (request) => {
        required(request.phone, {
          message: 'For urgent requests, please enter your phone number so we can call you back!',
        });
      },
    );
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.requestForm().value());
  }
}
