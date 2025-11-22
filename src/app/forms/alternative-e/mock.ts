import { FieldPath, PathKind } from '@angular/forms/signals';

export function validatePath(field: FieldPath<any, PathKind.Root>, ...validatorFns: Function[]) {
  console.log(field);
}
