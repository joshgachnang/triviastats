import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CountdownComponent, CountdownPipe, TimeToTriviaPipe } from '../pages/home/countdown.component';
import { TwitterWidgetComponent } from '../pages/home/twitter-widget.component';
import { TeamScorePage } from '../pages/scores/team';
import { HourScorePage } from '../pages/scores/hour';
import { AuthComponent } from '../pages/auth/auth';
import { RulesPage } from '../pages/rules/rules';
import { ScoresPage } from '../pages/scores/scores';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'ee03ee3c'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    TeamScorePage,
    HourScorePage,
    RulesPage,
    ScoresPage,
    CountdownComponent,
    TimeToTriviaPipe,
    CountdownPipe,
    TwitterWidgetComponent,
    AuthComponent,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    TeamScorePage,
    HourScorePage,
    RulesPage,
    ScoresPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
