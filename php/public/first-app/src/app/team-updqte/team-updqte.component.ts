import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsDataService } from '../teams-data.service';
	import { NgForm } from "@angular/forms";
import { Team } from '../teams/teams.component';

@Component({
  selector: 'app-team-updqte',
  templateUrl: './team-updqte.component.html',
  styleUrls: ['./team-updqte.component.css']
})
export class TeamUpdqteComponent implements OnInit {

team!:Team;
  id!: string;
@ViewChild("updateTeam")
  updateTeam!: NgForm;

  constructor( private teamService: TeamsDataService, private route:ActivatedRoute) { this.team = new Team("","",0,"",["r"]); }

  ngOnInit(): void {
       const id = this.route.snapshot.params["id"];
    this.teamService.getTeam(id)
        .then(response => {this.team = response})
        .catch(error => {console.log("Error getting team", error);
        });
  }
  update(): void {
    let id =this.route.snapshot.params["id"];   
    console.log("body ", this.updateTeam.value);    

    this.teamService
      .updateTeam(this.updateTeam.value, id)
    .then((response) => {this.team = response})
     .catch(error => {console.log("Error getting team", error);
        });

      //  window.location.reload();

  }

}
