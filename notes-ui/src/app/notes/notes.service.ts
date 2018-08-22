import { Injectable }                               from '@angular/core';
import { Http, Response, RequestOptions, Headers }  from '@angular/http';
import { Observable }                               from 'rxjs/Observable';
import { environment }                              from './../../environments/environment';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/interval';

import { Note } from './notes';

@Injectable()
export class NotesService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor (private http: Http) {}

  _requestOptions(): RequestOptions {
    let headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("content-type", "application/json");
    return new RequestOptions({ headers: headers });
  }

  getNotes(): Observable<Note[]> {
    return this.http.get(environment.api_url + environment.api_path, this._requestOptions())
      .map(this.extractNotes)
      .catch(this.handleError);
  }

  refreshNotes(period: number): Observable<Note[]> {
    return Observable.interval(period)
      .switchMap(() => this.http.get(environment.api_url + environment.api_path, this._requestOptions()))
      .map(this.extractNotes)
      .catch(this.handleError);
  }

  private extractNotes(res: Response) {
    let data = res.json();
    if (data) {
      data.forEach(element => {
        element.date = new Date(element.date*1000)
        element.title = element.title
        element.text = element.text
      });
      console.log(data);
      return data;
    }
    return { };
  }

  addNote(title: string, text: string): Observable<Note> {
    let body = {
      title: title,
      text: text
    }
    return this.http.post(
      environment.api_url + environment.api_path,
      body,
      this._requestOptions())
      .map(this.extractNote)
      .catch(this.handleError);
  }

  private extractNote(res: Response) {
    let data = res.json();
    console.log(data);
    let note = new Note();
    note.date = new Date(data.date*1000);
    note.title = data.title;
    note.text = data.text;
    return note;
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
