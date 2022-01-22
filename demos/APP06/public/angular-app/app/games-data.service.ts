import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  private baseUrl:string = "http://localhost:3000/api/";

  constructor(private http: HttpClient) { }

  getGames(): Promise<Game[]>{
    const url: string =  this.baseUrl + "games";
    return this.http.get(url).toPromise()
            .then(response => response as Game[])
            .catch(this._handleError);
  }

  getGame(id: string): Promise<Game> {
    const url: string =  this.baseUrl + "games/" + id;
    return this.http.get(url).toPromise()
            .then(response => response as Game)
            .catch(this._handleError);
  }

  addGame(game: Game): Promise<Game> {
    const url: string =  this.baseUrl + "games";
    console.log(game);
    
    //
    return this.http.post(url, {title: game.title, price: game.price}).toPromise()
            .then(response => response as Game)
            .catch(this._handleError);
  }

  private _handleError(err: any): Promise<any>{
    console.log("Service Error", err);
    return Promise.reject(err.message || err);
  }
}
