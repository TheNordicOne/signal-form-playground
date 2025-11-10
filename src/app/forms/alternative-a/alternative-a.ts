import {Component, signal} from '@angular/core';
import {initialMaintenanceRequest, MaintenanceRequest} from '../../model/maintenance-request';
import {Field} from '@angular/forms/signals';
import {FormsModule} from '@angular/forms';
import {ValidationErrors} from '../validation-errors/validation-errors';
import {applyWhenValue, form, minLength, required, validateBuildingExists, validateRoomExists} from './wrapper';

@Component({
  selector: 'app-proposed',
  imports: [
    Field,
    FormsModule,
    ValidationErrors
  ],
  templateUrl: './alternative-a.html',
  styleUrl: './alternative-a.css',
  host: {
    'class': 'form-wrapper'
  }
})
export class AlternativeA {
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


  requestForm = form(this.request, {
    buildingNumber: [
      required({message: 'Please enter the room number'}),
      minLength(2),
      validateBuildingExists()
    ],
    roomNumber: [
      required({message: 'Please enter the room number'}),
      minLength(2),
    ],
    fullName: [
      required(),
    ],
    email: [
      required(),
    ],
    'details.category': [
      required(),
    ],
    'details.description': [
      required(),
    ],
    phone: [
      applyWhenValue((request) => request.details.urgency === 'high' || request.details.urgency === 'critical', [
        required({message: 'For urgent requests, please enter your phone number so we can call you back!'})
      ])
    ],
    root: [
      validateRoomExists(),
    ],
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.requestForm().value());
  }
}
