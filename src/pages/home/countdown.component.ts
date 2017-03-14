import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'countdown',
  template: `
    <div class='countdown'>
      <span class='days'>{{ date | async | timeToTrivia | countdown:'days' }} days</span>
      <span class='hours'>{{ date | async | timeToTrivia | countdown:'hours' }}</span>:
      <span class='minutes'>{{ date | async | timeToTrivia | countdown:'minutes' }}</span>:
      <span class='seconds'>{{ date | async | timeToTrivia | countdown:'seconds' }}</span>
    </div>
  `,
  styles: [`
    .countdown {
      font-size: 125%;
    }
  `],
  providers: [ ],
})
export class CountdownComponent {

  public date = Observable
       .interval(1000)
       .map(()=> new Date());

  constructor() {}

}

@Pipe({name: 'timeToTrivia'})
export class TimeToTriviaPipe implements PipeTransform {
  // In UTC
  private triviaStartDates = [
    '2017-04-21T23:00:00.000Z',
    '2018-04-13T23:00:00.000Z',
    '2019-04-12T23:00:00.000Z',
  ];
  transform(value: Date, format: string): any {
    return Math.floor(moment(this.triviaStartDates[0]).diff(moment(value)) / 1000);
  }
}

@Pipe({name: 'countdown'})
export class CountdownPipe implements PipeTransform {
  transform(diffInSeconds: number, format: string): any {
    let delta = diffInSeconds;

    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    let mins = Math.floor(delta / 60) % 60;
    delta -= mins * 60;

    let secs = Math.floor(delta % 60);

    let minutes = mins < 10 ? '0' + String(mins) : String(mins);
    let seconds = secs < 10 ? '0' + String(secs) : String(secs);

    return {days, hours, minutes, seconds}[format];
  }
}
