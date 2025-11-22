import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrors } from '../validation-errors/validation-errors';
import { initialMaintenanceRequest, MaintenanceRequest } from '../../model/maintenance-request';

import { minLength, required } from '../mock';
import { buildingExists, roomExists, validateFields, validateForm, whenValue } from './mock';
import { isUrgent } from './conditions';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-personal-ideal',
  imports: [FormsModule, ReactiveFormsModule, ValidationErrors],
  templateUrl: './dream-syntax.html',
})
export class DreamSyntax {
  request = signal<MaintenanceRequest>({ ...initialMaintenanceRequest });

  /*
    Dream Syntax

    This is my personal idea of a dream syntax. Changes here also contain renaming of some functions.
    This may change overtime when new ideas arise.

    What I personally really want is a syntax that is easy to read and easy to maintain.

    Criteria I'm looking for are:
    - Is it fully declarative?
    - Does it make semantic sense when reading?
    - Are functions named in an easy-to-understand way?
      - This includes naming that align with how devs think about logic

    I would suggest these renames:
    - applyWhen => when
      - dropping "apply" as it is implied
      - reads as: validate when isUrgent/isDelayed/isTomorrow
      - same goes for other applyWhen alternatives

    - validateTree => validateForm
      - tree may be the correct term on a technical level
      - however a dev is writing a form, so one would also think in terms of a form
      - having to remember that a form is represented as a tree is additional mental overhead that we can avoid
      - reads as: validate against the whole form

    Of course, there is always the case where we may need to have a more technical name to better differentiate different implementations.
    For example a developer would still need to learn the difference between when and whenValue.
    Ideally the more common use-case has the simpler name.

    ***Pros:**
    - fully declarative
      - all validators for a given field are immediately visible
    - fields are not repeated
    - which field is targeted when using whenValue is clear
    - doing cross-field validation does not require special functions
    - conditions can be defined once and reused across multiple fields
    - whenValue can be applied to the whole form too if targeting multiple fields that way is wanted
    - clear separation between field and full form validation


    ***Cons:**
    - whenValue now only targets a single field (but condition reuse and targeting whole form mitigates this)

  */
  requestForm = form(this.request, (path) => {
    // Note: isUrgent is a custom function defined outside of this component

    validateFields(path, {
      buildingNumber: [
        required({ message: 'Please enter the building number' }),
        minLength(2, { message: 'Must have at least 2 characters' }),
        buildingExists(),
      ],
      roomNumber: [
        required({ message: 'Please enter the room number' }),
        minLength(2),
        roomExists(),
      ],
      fullName: [required()],
      details: {
        category: [required()],
        description: [required()],
      },
      email: [required()],
      phone: [
        whenValue(isUrgent, [
          required({
            message: 'For urgent requests, please enter your phone number so we can call you back!',
          }),
        ]),
      ],
    });

    validateForm(
      path,
      // validator functions for the whole form
    );
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.requestForm().value());
  }
}
