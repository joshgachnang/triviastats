import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, Deploy, User } from '@ionic/cloud-angular';

import { ApiService, Score } from '../../services/api';
import { TeamScorePage } from '../scores/team';
import { ScoresPage } from '../scores/scores';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ ApiService ],
})
export class HomePage {
  public scores: Score[] = [];

  constructor(public navCtrl: NavController, public api: ApiService, public deploy: Deploy, public authA: Auth,
              public userA: User) {}

  ionViewDidLoad() {
    this.checkForNewVersion();
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
    this.navCtrl.push(ScoresPage, {year: this.scores[0].year, hour: this.scores[0].hour});
    console.log('all scores');
  }

  private checkForNewVersion() {
    console.debug('checking for new app version');
    if (this.authA.isAuthenticated()) {

      console.log("checking if we shoudl set channel", this.userA);
    }
    this.deploy.check().then((snapshotAvailable: boolean) => {
      if (snapshotAvailable) {
        console.info('new version available')
        this.deploy.download().then(() => {
            return this.deploy.extract();
        });
      } else {
        console.debug('no new version');
      }
    });
  }
}
