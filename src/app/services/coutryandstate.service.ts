import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class CoutryandstateService {

   private baseUrl = `http://localhost:8080/api`;

  constructor(private httpClient : HttpClient) { }

  getCountries() : Observable<Country[]>{

    const searchUrl = `${this.baseUrl}/countries`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(name : String) : Observable<State[]>{

    const searchUrl = `${this.baseUrl}/states/search/findByCountryName?name=${name}`;
    return this.httpClient.get<GetStatesResponse>(searchUrl).pipe(
      map(response => response._embedded.states)
    );
  }
}

interface GetResponse{
  _embedded : {
    countries : Country[];
  }
}

interface GetStatesResponse{
  _embedded : {
    states : State[];
  }
}
