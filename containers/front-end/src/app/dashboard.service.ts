import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
// Objects
import {Conference} from './conference';

@Injectable()
export class DashboardService {
  // IP address where map api server is being served
  private mapApiURL = 'http://169.46.74.117';

  constructor(private http: HttpClient) {

   }

    /**
   * GET all conferences from the map-api server.
   * @param - none
   */
  getConferences(): Observable<Conference[]> {
    const url = `${this.mapApiURL}/events`;
    return this.http.get<Conference[]>(url)
      .pipe(
        tap(conferences => {
          console.log(`fetched conferences`);
      }),
        catchError(this.handleError('getConferences', []))
      );
  }

    /**
   * GET a conference by id from the map-api server.
   * @param eventId - id of the conference
   */
  getConference(eventId: string): Observable<Conference> {
    const url = `${this.mapApiURL}/events/${eventId}`;
    return this.http.get<Conference>(url).pipe(
        tap(conference => {
          console.log(`fetched conference eventId=${eventId}`);
        }),
        catchError(this.handleError<Conference>(`getConference eventId=${eventId}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
