import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiService } from '../../services/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ ApiService ],
})
export class HomePage {

  constructor(public navCtrl: NavController, public api: ApiService) {

  }

  ionViewDidLoad() {
    this.api.fetchScores().subscribe((scores) => {
      console.log(scores);
    });
  }

}
