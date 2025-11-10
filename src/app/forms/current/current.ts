import {Component, signal} from '@angular/core';
import {initialMaintenanceRequest, MaintenanceRequest} from '../../model/maintenance-request';
import {applyWhenValue, Field, form, minLength, required} from '@angular/forms/signals';
import {FormsModule} from '@angular/forms';
import {validateBuildingExists, validateRoomExists} from '../../validators/maintance';
import {ValidationErrors} from '../validation-errors/validation-errors';

@Component({
  selector: 'app-current',
  imports: [
    Field,
    FormsModule,
    ValidationErrors
  ],
  templateUrl: './current.html',
  styleUrl: './current.css',
  host: {
    'class': 'form-wrapper'
  }
})
export class Current {
  request = signal<MaintenanceRequest>({...initialMaintenanceRequest});

  // Business Logic
  // buildingNumber is required
  // buildingNumber must have at least 2 characters
  // buildingNumber is checked against database for existence
  // roomNumber is required
  // roomNumber must have at least 2 characters
  // roomNumber is checked against database for existence in combination with the building
  // Full Name is required
  // E-Mail is required
  // Category is required
  // Phone is required if Urgency is high or critical
  // Description is required


  requestForm = form(this.request, (path) => {
    required(path.buildingNumber, {message: 'Please enter the room number'});
    required(path.roomNumber, {message: 'Please enter the room number'});
    required(path.fullName);
    required(path.details.category);
    required(path.details.description);
    required(path.email);

    minLength(path.buildingNumber, 2, { message: 'Must have at least 2 characters'});
    minLength(path.roomNumber, 2, { message: 'Must have at least 2 characters'});

    validateBuildingExists(path.buildingNumber);
    validateRoomExists(path);

    applyWhenValue(path, (request) => request.details.urgency === 'high' || request.details.urgency === 'critical', (request) => {
      required(request.phone, {message: 'For urgent requests, please enter your phone number so we can call you back!'});
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.requestForm().value());
  }
}
