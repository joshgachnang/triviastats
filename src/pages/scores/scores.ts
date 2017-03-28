import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { ApiService, Score } from '../../services/api';
import { TeamScorePage } from '../scores/team';

@Component({
  selector: 'hour-scores',
  templateUrl: 'scores.html',
  providers: [ ApiService ],
  styles: [`
    .search-button {
      /* line up with form above */
      margin-left: 25px;
    }
  `],
})
export class ScoresPage {
  public scores: Score[] = [];
  public year: number;
  public hour: number;
  public searchName: string;
  public searchResults: Boolean = false;
  public title: string;

  constructor(public navCtrl: NavController, public api: ApiService,
      private navParams: NavParams, public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    this.year = this.navParams.get('year');
    this.hour = this.navParams.get('hour');

    this.title = "Loading..";

    this.api.fetchScores(this.year, this.hour)
        .subscribe((scores: Score[]) => {
          console.debug('Fetched scores: ', scores);
          this.scores = scores;
          if (this.searchName) {
            this.title = this.searchName;
          } else {
            this.title = `Scores for ${this.scores[0].hour}, ${this.scores[0].year}`;
          }
        });
  }
  public teamSelected(team: any) {
    this.navCtrl.push(TeamScorePage, {year: team.year, team_name: team.team_name});
  }

  public searchTeams() {
    if (!this.searchName) {
      this.toast('Gotta enter a team name to search!');
      return;
    }
    this.api.fetchScores(undefined, undefined, undefined, this.searchName)
        .subscribe((scores: Score[]) => {
          this.searchResults = true;
          console.debug('Fetched scores: ', scores);
          this.scores = [];

          // Get all the unique team_name + year combinations
          let scoreMap = {};
          scores.map((score) => {
            if (!scoreMap[score.team_name + score.year]) {
              scoreMap[score.team_name + score.year] = [];
            }
            scoreMap[score.team_name + score.year].push(score);
          });

          // Pick the latest one and add to the list
          for (let teamyear of Object.keys(scoreMap)) {
            console.log("TEAMYEAR", scoreMap, teamyear, scoreMap[teamyear]);
            let teamyear_scores = scoreMap[teamyear].sort((a,b) => b - a);
            if (teamyear_scores.length === 0) continue;
            console.log("SAVING", teamyear_scores[0]);
            this.scores.push(teamyear_scores[0]);
          }

          // Finally, sort by year
          this.scores = this.scores.sort((a,b) => b.year - a.year);
          console.log("THISSCORES", this.scores);

          this.title = this.searchName;
        });
  }

  private toast(str: string) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 3000,
    });
    toast.present();
  }
}
