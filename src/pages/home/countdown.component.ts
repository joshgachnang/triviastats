import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

// In UTC
let triviaStartDates = [
  moment('2017-04-21T23:00:00.000Z'),
  moment('2018-04-13T23:00:00.000Z'),
  moment('2019-04-12T23:00:00.000Z'),
  moment('2020-04-17T23:00:00.000Z'),
  moment('2021-04-16T23:00:00.000Z'),
];

@Component({
  selector: 'countdown',
  template: `
    <div *ngIf='isTrivia()'>
      <span class='row countdown-date days'>Hour {{ date | async | timeToTrivia | triviaHour }}</span>
    </div>
    <div *ngIf='!isTrivia()'>
      <div class='row countdown-date'>
        <span class='days'>{{ date | async | timeToTrivia | countdown:'days' }} days</span>
      </div>
      <div class='row countdown-time'>
        <span class='hours'>{{ date | async | timeToTrivia | countdown:'hours' }}</span>:
        <span class='minutes'>{{ date | async | timeToTrivia | countdown:'minutes' }}</span>:
        <span class='seconds'>{{ date | async | timeToTrivia | countdown:'seconds' }}</span>
      </div>
    </div>
  `,
  styles: [`
    .countdown-date {
      font-size: 300%;
      font-weight: bold;
      display: block;
      min-width: 250px;
      width: 100%;
      text-align: center;
    }
    .countdown-time {
      font-size: 250%;
      font-weight: bold;
      display: block;
      width: 100%;
      text-align: center;
    }
  `],
  providers: [ ],
})
export class CountdownComponent {

  public date = Observable
       .interval(1000)
       .map(()=> new Date());

  constructor() {}
  public isTrivia(): boolean {
    let now = moment();
    for (let start of triviaStartDates) {
      let end = moment(start).add(54, 'hours');
      if (now.isBetween(start, end)) {
        return true
      }
    }
    return false;
  }
}

@Pipe({name: 'timeToTrivia'})
export class TimeToTriviaPipe implements PipeTransform {

  transform(value: Date, format: string): any {
    let now = moment(value);
    for (let start of triviaStartDates) {
      if (now.isBefore(start)) {
        return start.diff(now, 'seconds');
      }
      // Clone start because add has side effects to start
      let end = moment(start).add(54, 'hours');
      if (now.isBetween(start, end)) {
        return now.diff(start, 'seconds');
      }
    }
  }
}

@Pipe({name: 'triviaHour'})
export class TriviaHourPipe implements PipeTransform {
  transform(diffInSeconds): number {
    return Math.ceil(Math.abs(diffInSeconds) / 3600);
  }
}

@Pipe({name: 'countdown'})
export class CountdownPipe implements PipeTransform {
  transform(diffInSeconds: number, format: string): number {
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
