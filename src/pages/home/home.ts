import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiService, Score } from '../../services/api';
import { TeamScorePage } from '../scores/team';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ ApiService ],
})
export class HomePage {
  public scores: Score[] = [];
  constructor(public navCtrl: NavController, public api: ApiService) {

  }

  ionViewDidLoad() {
    this.api.fetchScores().subscribe((scores: Score[]) => {
      console.debug('Fetched scores: ', scores);
      this.scores = scores;
    });
  }

  public teamSelected(team: any) {
    console.log('selected', team);
    this.navCtrl.push(TeamScorePage, {year: team.year, team_name: team.team_name});
  }

  public allScores() {
    console.log('all scores');
  }

}
