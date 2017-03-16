import { Component } from '@angular/core';

@Component({
  selector: 'twitter-widget',
  template: `<div class='twitter-timeline-container'>
    <a class="twitter-timeline" data-width="760" data-chrome="noscrollbar noheader nofooter noborders"
      href="https://twitter.com/hashtag/trivia48" data-widget-id="842020332026372096">
      #trivia48 Tweets
    </a>
  </div>`,
  providers: [ ],
})
export class TwitterWidgetComponent {
  constructor() {
    !function(d,s,id){
        var js: any,
            fjs=d.getElementsByTagName(s)[0],
            p='https';
        if(!d.getElementById(id)){
            js=d.createElement(s);
            js.id=id;
            js.src=p+"://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js,fjs);
        }
    }
    (document,"script","twitter-wjs");
  }


}

