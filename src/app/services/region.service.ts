import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RegionService {

  constructor() { }

  getUniqueRaknaAntal(): Observable<object[]> {
    const resArr = [
    {value: 1, viewValue: 'Stockholm'},
    {value: 2, viewValue: 'Skövde'},
    {value: 3, viewValue: 'Eskilstuna'},
    {value: 4, viewValue: 'Sunderbyn'}];

    return of(resArr);
  }
}
