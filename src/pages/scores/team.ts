import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

import { ApiService, Score } from '../../services/api';

@Component({
  selector: 'team-scores',
  templateUrl: 'team.html',
  providers: [ ApiService ],
})
export class TeamScorePage {
  public scores: Score[] = [];
  public year: number;
  public hour: number;
  public team_name: string;

  constructor(public navCtrl: NavController, public api: ApiService, public loadingCtrl: LoadingController,
      private navParams: NavParams) {}

  ionViewDidLoad() {
    this.year = this.navParams.get('year');
    this.hour = this.navParams.get('hour');
    this.team_name = this.navParams.get('team_name');
    let loader = this.loadingCtrl.create({
      content: "Loading scores..",
    });
    loader.present();
    this.api.fetchScores(this.year, this.hour, this.team_name)
        .subscribe((scores: Score[]) => {
          console.debug('Fetched scores: ', scores);
          loader.dismiss().catch(() => {});
          this.scores = scores;
        });
  }
}
