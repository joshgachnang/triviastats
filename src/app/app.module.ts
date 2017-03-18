import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CountdownComponent, CountdownPipe, TimeToTriviaPipe } from '../pages/home/countdown.component';
import { TwitterWidgetComponent } from '../pages/home/twitter-widget.component';
import { TeamScorePage } from '../pages/scores/team';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'ee03ee3c'
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TeamScorePage,
    CountdownComponent,
    TimeToTriviaPipe,
    CountdownPipe,
    TwitterWidgetComponent,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TeamScorePag
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
