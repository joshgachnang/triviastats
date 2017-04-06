import { Component } from '@angular/core';
import { TrackingService } from '../../services/tracking';


@Component({
  selector: 'rules',
  templateUrl: 'rules.html',
  providers: [ TrackingService ],
})
export class RulesPage {

  constructor(private tracking: TrackingService) {}

  ionViewDidLoad() {
    this.tracking.track("ViewRules");
  }

}
