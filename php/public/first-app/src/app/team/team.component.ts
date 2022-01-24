import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsDataService } from '../teams-data.service';

import { Team } from '../teams/teams.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team!: Team;
  id!: string;
  constructor(private route: ActivatedRoute, private teamService: TeamsDataService) {
    this.team = new Team("","",0,"",["r"]);
   }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.teamService.getTeam(id)
        .then(response => {this.team = response})
        .catch(error => {console.log("Error getting team", error);
        });
  }

  public delete(): void {
    const id = this.route.snapshot.params["id"];
    this.teamService.deleteTeam(id)
        .then(response => {this.team = response})
        .catch(error => {console.log("Error getting team", error);
        });
  } 

}
