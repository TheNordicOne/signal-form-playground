import { Component, signal } from '@angular/core';
import { initialMaintenanceRequest, MaintenanceRequest } from '../../model/maintenance-request';
import { Field, minLength, required } from '@angular/forms/signals';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrors } from '../validation-errors/validation-errors';
import { applyWhenValue, form } from './mock';
import { validateBuildingExists, validateRoomExists } from '../../validators/maintance';

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
    - mostly declarative
    - fields are not repeated
    - applyWhenValue only requires the condition to be written once
    - (maybe) more flexible for having an arrow function

    ***Cons:**
    - applyWhenValue makes it overall less declarative, but is itself declarative
    - more verbose due to needing an arrow function
      - maybe not too bad because it is a pattern we as devs are used to
    - access to nested properties not great
    - requires a reserved key to add validators to the whole form
  */
  requestForm = form(this.request, {
    buildingNumber: (field) => {
      required(field, { message: 'Please enter the room number' });
      minLength(field, 2, { message: 'Must have at least 2 characters' });
      validateBuildingExists(field);
    },
    roomNumber: (field) => {
      required(field, { message: 'Please enter the room number' });
      minLength(field, 2, { message: 'Must have at least 2 characters' });
    },
    fullName: (field) => {
      required(field);
    },
    'details.category': (field) => {
      required(field);
    },
    'details.description': (field) => {
      required(field);
    },
    email: (field) => {
      required(field);
    },
    root: (path) => {
      validateRoomExists(path);
      applyWhenValue(
        path,
        (request) => request.details.urgency === 'high' || request.details.urgency === 'critical',
        {
          phone: (field) => {
            required(field, {
              message:
                'For urgent requests, please enter your phone number so we can call you back!',
            });
          },
        },
      );
    },
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.requestForm().value());
  }
}
