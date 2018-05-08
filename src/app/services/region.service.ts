import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RegionService {

  constructor() { }

  getUniqueRaknaAntal(): Observable<object[]> {
    const resArr = [{viewValue: 'Västragötaland', value: 'Västragötaland'},
                    {viewValue: 'Stockholm', value: 'Stockholm'}, {viewValue: 'Skövde', value: 'Skövde'} ];

    return of(resArr);
  }
}
