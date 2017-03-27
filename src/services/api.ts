import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export class Score {
  public year: number;
  public hour: number;
  public team_name: string;
  public place: number;
  public score: number;

  constructor(data) {
    this.year = data.year;
    this.hour = data.hour;
    this.team_name = data.team_name;
    this.place = data.place;
    this.score = data.score;
  }
}

@Injectable()
export class ApiService {
  private url = 'https://api.triviastats.com/api/v1/';
  private defaultOrdering = 'ordering=-year,-hour,-score';

  constructor(private http: Http) {}

  public fetchScores(year?: number, hour?: number, team_name?: string): Observable<Score[]> {
    let url = `${this.url}scores/?${this.defaultOrdering}`;
    if (year) {
      url += `&year=${year}`;
    }
    if (hour) {
      url += `&hour=${hour}`;
    }
    if (team_name) {
      url += `&team_name=${encodeURIComponent(team_name)}`;
    }

    console.debug(`Fetching url: ${url}`);
    return this.http.get(url)
      .map(this.extractScores.bind(this))
      .catch(this.apiError);
  }

  private extractScores(res: Response): Score[] {
    let scores: Score[] = [];
    for (let score of res.json().results) {
      scores.push(new Score(score));
    }
    return scores;
  }

  private apiError(error: Response | any) {
    // TODO: integrate with sentry
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(`Base API Error: ${errMsg}`);
    return [];
  }
}
