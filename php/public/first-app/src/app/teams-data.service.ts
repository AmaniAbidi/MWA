import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Team } from './teams/teams.component';

@Injectable({
  providedIn: 'root'
})
export class TeamsDataService {

  private baseUrl:string = "http://localhost:3000/api/";

  constructor(private http: HttpClient) { }

  getTeams(): Promise<Team[]>{
    const url: string =  this.baseUrl + "teams";
    return this.http.get(url).toPromise()
            .then(response => response as Team[])
            .catch(this._handleError);
  }

  getTeam(id: string): Promise<Team> {
    const url: string =  this.baseUrl + "teams/" + id;
    return this.http.get(url).toPromise()
            .then(response => response as Team)
            .catch(this._handleError);
  }

  addTeam(team: Team): Promise<Team> {
    const url: string =  this.baseUrl + "teams";
    console.log(team);
    
    //
    return this.http.post(url, {name: team.name, coachName: team.coachName}).toPromise()
            .then(response => response as Team)
            .catch(this._handleError);
  }


   public deleteTeam(teamId: string) : Promise<Team> {
     const url: string =  this.baseUrl + "teams/"+teamId;
      return this.http.delete(url).toPromise()
             .then(response => response as Team)
             .catch(this._handleError);
   }

   updateTeam(team: Team, id:string): Promise<any> {
    const url: string =  this.baseUrl + "teams/"+id;
    return this.http.put(url, team).toPromise()
            .then(response => response as Team)
            .catch(this._handleError);
  }

  private _handleError(err: any): Promise<any>{
    console.log("Service Error", err);
    return Promise.reject(err.message || err);
  }
}
