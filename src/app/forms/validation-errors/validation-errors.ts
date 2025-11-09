import {Component, computed, input} from '@angular/core';
import {ValidationErrorWithField} from "@angular/forms/signals";

@Component({
  selector: 'app-validation-errors',
  imports: [],
  templateUrl: './validation-errors.html',
  styleUrl: './validation-errors.css',
})
export class ValidationErrors {
  errors = input.required<ValidationErrorWithField[]>();

  errorMessages = computed(() => this.errors().map(e => toMessage(e)));
}

function toMessage(error: ValidationErrorWithField){

  switch (error.kind){
    case 'building_does_not_exist':
      return 'Building does not exist'
    case 'room_does_not_exist':
      return 'Room does not exist'
    case 'api-failed':
      return 'Validation failed because the server is not responding';
    default:
      return error.message ?? 'Enter a value!'
  }
}
