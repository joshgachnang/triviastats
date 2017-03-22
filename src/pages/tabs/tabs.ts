import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { RulesPage } from '../rules/rules';
import { ScoresPage } from '../scores/scores';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ScoresPage
  tab3Root: any = RulesPage;

  constructor() {

  }
}
