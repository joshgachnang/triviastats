import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ApiService, Score } from '../../services/api';
import { TeamScorePage } from '../scores/team';

@Component({
  selector: 'hour-scores',
  templateUrl: 'scores.html',
  providers: [ ApiService ],
})
export class ScoresPage {
  public scores: Score[] = [];
  public year: number;
  public hour: number;

  constructor(public navCtrl: NavController, public api: ApiService,
      private navParams: NavParams) {}

  ionViewDidLoad() {
    this.year = this.navParams.get('year');
    this.hour = this.navParams.get('hour');

    this.api.fetchScores(this.year, this.hour)
        .subscribe((scores: Score[]) => {
          console.debug('Fetched scores: ', scores);
          this.scores = scores;
        });
  }
  public teamSelected(team: any) {
    console.log('selected', team);
    this.navCtrl.push(TeamScorePage, {year: team.year, team_name: team.team_name});
  }
}
