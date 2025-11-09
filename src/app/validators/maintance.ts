import {FieldPath, validateAsync} from '@angular/forms/signals';
import {rxResource} from '@angular/core/rxjs-interop';
import {delay, map, Observable, of} from 'rxjs';
import {MaintenanceRequest} from '../model/maintenance-request';

export function validateBuildingExists(schema: FieldPath<string>){
 validateAsync(schema, {
   params: (ctx) => ({
     buildingNumber: ctx.value()
   }),
   factory: (params) => {
     return rxResource(
       {
         params,
         stream: (p) =>  rxValidateBuilding(p.params.buildingNumber)
       }
     )
   },
   onSuccess: (result: boolean, _ctx) => {
     if (!result) {
       return {
         kind: 'building_does_not_exist',
       };
     }
     return null;
   },
   onError: (_, _ctx) => {
     return {
       kind: 'api-failed'
     };
   },
 })
}

export function validateRoomExists(schema: FieldPath<MaintenanceRequest>){
  validateAsync(schema, {
    params: (ctx) => ({
      value: ctx.value(),
    }),
    factory: (params) => {
      return rxResource(
        {
          params,
          stream: (p) =>  rxValidateRoom(p.params.value.buildingNumber, p.params.value.roomNumber)
        }
      )
    },
    onSuccess: (result: boolean, ctx) => {
      if (!result) {
        return {
          kind: 'room_does_not_exist',
          field: ctx.field.roomNumber,
        };
      }
      return null;
    },
    onError: (_, ctx) => {
      return {
        kind: 'api-failed',
        field: ctx.field.roomNumber,
      };
    },
  })
}


const buildings = ['A1', 'A2', 'A3', 'A4'];

const rooms: Record<string, string[]> = {
  A1: ['11', '12', 'Storage'],
  A2: ['02', '22'],
  A3: ['300', '301', '302'],
  A4: ['404'],
};

function rxValidateBuilding(buildingNumber: string): Observable<boolean> {

  return of(null).pipe(
    delay(2000),
    map(() => buildings.includes(buildingNumber))
  );
}

function rxValidateRoom(buildingNumber: string, roomNumber: string): Observable<boolean> {

  return of(null).pipe(
    delay(2000),
    map(() => {
      return rooms[buildingNumber]?.includes(roomNumber) ?? false
    })
  );
}
