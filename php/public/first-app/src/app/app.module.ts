import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';


import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TeamComponent } from './team/team.component';
import { AppComponent } from './app.component';
import { TeamUpdqteComponent } from './team-updqte/team-updqte.component';
import { TeamDeleteComponent } from './team-delete/team-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    TeamsComponent,
    ErrorPageComponent,
    TeamComponent,
    TeamUpdqteComponent,
    TeamDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "teams",
        component: TeamsComponent
      },
      {
        path: "teams/update/:id",
        component: TeamUpdqteComponent
      },
      {
        path: "team/:id",
        component: TeamComponent
      },
      {
        path: "**",
        component: ErrorPageComponent
      }
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
