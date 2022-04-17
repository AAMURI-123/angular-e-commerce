import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthandyearService {

  constructor() { }

  getMonths(theMonth : number) : Observable<number[]>{

    let months : number[]=[];
    for(theMonth; theMonth <=12; theMonth++){
      months.push(theMonth);
    }

    return of(months);
  }

  getYears() : Observable<number[]>{

    let currentYear : number = + new Date().getFullYear();
    let endYear = currentYear + 10 ;
    let theYear : number[]=[];

    for(currentYear; currentYear <= endYear; currentYear++){
      theYear.push(currentYear);
    }

    return of(theYear);
  }
}
