import { Mixpanel, MixpanelPeople } from '@ionic-native/mixpanel';
import { Injectable } from '@angular/core';


@Injectable()
export class TrackingService {
  private MIXPANEL_TOKEN: string = "2c91e16122273e34431402cb3895ea46";
  constructor(private mixpanel: Mixpanel, private mixpanelPeople: MixpanelPeople) {
    this.mixpanel.init(this.MIXPANEL_TOKEN)
      .then(this.onSuccess)
      .catch(this.onError);
  }

  identify(email: string, team: string) {
    console.debug("[Mixpanel] identifying user:", email, team);
    this.mixpanelPeople.identify(email);
    this.mixpanelPeople.set({team: team});
  }

  track(event: string, properties?: any) {
    console.debug("[Mixpanel] tracking: ", event, properties);
    if (properties) {
      this.mixpanel.track(event, properties);
    } else {
      this.mixpanel.track(event);
    }
  }

  onSuccess(e) {
    console.debug("Initialized mixpanel: ", e);
  }

  onError(e) {
    console.error("Mixpanel error: ", e);
  }
}
