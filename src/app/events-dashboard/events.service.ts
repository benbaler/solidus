import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { EventStatus, SingleEvent } from './event.model';
import { EVENTS_DATA } from './events.data';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events$ = new ReplaySubject<SingleEvent[]>();

  constructor() {
    this.fetchAndSetEventsObservable();
  }

  fetchAndSetEventsObservable(): void {
    this.events$.next(EVENTS_DATA.map(event => new SingleEvent(event.timestamp, +event.price, EventStatus[event.status], event.snapshot)));
  }

  getEventsObservable(): Observable<SingleEvent[]> {
    return this.events$.asObservable();
  }
}
