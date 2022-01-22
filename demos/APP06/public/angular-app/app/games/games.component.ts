import { Component, OnInit } from '@angular/core';

import { FActsApiService } from '../facts-api.service';
import { GamesDataService } from '../games-data.service';

export class Game{
  #_id!: any;
  #title!:string;
  #year!:number;
  #rate!:number;
  #price!:number;
  #minPlayers!:number;
  #maxPlayers!:number;
  #minAge!:number;
  get _id() {return this.#_id}
  get price() {return this.#price}
  set price(price: number) {this.#price = price}
  get title() {return this.#title};
  set title(title: string) {this.#title = title}
  get year() {return this.#year};
  get rate() {return this.#rate};
  get minPlayers() {return this.#minPlayers};
  get maxPlayers() {return this.#maxPlayers};
  get minAge() {return this.#minAge};

  constructor(id: any, title:string, price:number){
    this.#price = price;
    this.#title = title;
    this.#_id = id;
  }
}

export class Fact{
  #title!:string;
  #price!:number;
  get text() {return this.#title};
  get source() {return this.#price};
  constructor(title:string, price:number){
    this.#price = price;
    this.#title = title;
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  // games = [{title : "Catan",price:39},{title: "Onitama", price: 22},{title: "BUuuuu", price:23}]
  // game = {
  //   title: "Catan",
  //   price: 39.99
  // }

  games:Game[] = [];
  newGame: Game = new Game("","",0);
  constructor( private factsService: FActsApiService, private gamesService:GamesDataService) {
    factsService.getFacts().then(function(facts){
      console.log("Facts are", facts);
      
    });
  }

  ngOnInit(): void {
    this.gamesService.getGames()
          .then(response => this._setGames(response))
          .catch(this._errorHandler);
  }

  private _errorHandler(error:any):void {
    console.log("Error while getting games");
    
  }

  private _setGames(games:Game[]): void {
    this.games = games
  }

  public save(): void{
    this.gamesService.addGame(this.newGame)
    .then(response => console.log("Game added"))
    .catch(this._errorHandler);
    
  }
}
