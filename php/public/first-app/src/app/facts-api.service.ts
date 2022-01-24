import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Fact } from './teams/teams.component';

@Injectable({
  providedIn: 'root'
})
export class FActsApiService {

  #apiBaseUrl: string = "https://cat-fact.herokuapp.com/";

  constructor(private http: HttpClient) { }

  public getFacts():Promise<Fact[]>{
    console.log("getFacts() called");
    
    const url: string = this.#apiBaseUrl+"facts/random?animal_type=cat&amount=10";
    return this.http.get(url)
    .toPromise()
    .then(response => response as Fact[])
    .catch(this.handleError);
  }

  private handleError(error:any): Promise<any>{
    console.log("Something went wrong");
    return Promise.reject(error.message() || error);
    
  }
}
