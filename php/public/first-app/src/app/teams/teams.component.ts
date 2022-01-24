import { Component, OnInit,ViewChild } from '@angular/core';

import { FActsApiService } from '../facts-api.service';
import { TeamsDataService } from '../teams-data.service';
import { NgForm } from "@angular/forms";
export class Team{
  #_id!: any;
  #name!:string;
  #year!:number;
  #coachName!:string;
  #players!: [string];
  
  get _id() {return this.#_id}
  get name() {return this.#name}
  set name(name: string) {this.#name = name}

  set year(year: number) {this.#year = year}
  get coachName() {return this.#coachName};
  set coachName(coachName: string) {this.#coachName = coachName}

  set players(players: [string]) {this.#players = players}
  

  constructor(id: any, name:string, year:number, coachName: string, players:[string]){
    this.#_id = id;
    this.#name = name;
    this.#year = year;
    this.#coachName=coachName;
    this.#players=players;
  }
}

export class Fact{
  #name!:string;
  #coachName!:string;
  get text() {return this.#name};
  get source() {return this.#coachName};
  constructor(name:string, coachName:string){
    this.#name = name;
    this.#coachName = coachName;
  }
}

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  // games = [{title : "Catan",price:39},{title: "Onitama", price: 22},{title: "BUuuuu", price:23}]
  // game = {
  //   title: "Catan",
  //   price: 39.99
  // }

  teams:Team[] = [];
    @ViewChild("registerTeam")
  registerTeam!: NgForm;
  newTeam: Team = new Team("","",0,"",["r"]);
  constructor( private factsService: FActsApiService, private teamsService:TeamsDataService) {
    factsService.getFacts().then(function(facts){
      console.log("Facts are", facts);
      
    });
  }

  ngOnInit(): void {
    this.teamsService.getTeams()
          .then(response => this._setTeams(response))
          .catch(this._errorHandler);
  }

  private _errorHandler(error:any):void {
    console.log("Error while getting teams");
    
  }

  private _setTeams(teams:Team[]): void {
    this.teams = teams
  }

  public save(): void{
   

    this.teamsService.addTeam(this.registerTeam.value)
      .then((response) => (console.log("final result", response)));
    window.location.reload();
  }
 
}
