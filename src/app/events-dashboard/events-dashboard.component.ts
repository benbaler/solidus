import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SingleEvent } from './event.model';
import { EventsService } from './events.service';

export enum EventActionTypes {
  FIRST = 'First', PREVIOUS = 'Previous', PLAY = 'Play', PAUSE = 'Pause', NEXT = 'Next', LAST = 'Last'
}

@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.css'],
})
export class EventsDashboardComponent implements OnInit, OnDestroy {
  events$: Observable<SingleEvent[]>;
  selectedEvent$: Observable<SingleEvent>;

  selectedEventIndex = 0;
  totalEvents = 0;

  playSub: Subscription;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.events$ = this.eventsService.getEventsObservable().pipe(
      tap(events => this.totalEvents = events.length)
    );
    this.onSelectEvent(this.selectedEventIndex);
  }

  onSelectEvent(index: number): void {
    this.selectedEvent$ = this.eventsService.getEventsObservable().pipe(
      map(events => {
        if (index <= 0) {
          this.selectedEventIndex = 0;
          return events[0];
        }
        if (index >= events.length - 1) {
          this.selectedEventIndex = events.length - 1;
          return events[events.length - 1];
        }
        this.selectedEventIndex = index;
        return events[index];
      })
    );
  }

  onEventAction(type: EventActionTypes): void {
    this.playSubUnsubscribe();
    switch (type) {
      case EventActionTypes.FIRST:
        this.onSelectEvent(0);
        break;
      case EventActionTypes.PREVIOUS:
        this.onSelectEvent(this.selectedEventIndex - 1);
        break;
      case EventActionTypes.PLAY:
        this.playSub = interval(1000).subscribe(() => {
          this.onSelectEvent(this.selectedEventIndex + 1);
        });
        break;
      case EventActionTypes.PAUSE:
        break;
      case EventActionTypes.NEXT:
        this.onSelectEvent(this.selectedEventIndex + 1);
        break;
      case EventActionTypes.LAST:
        this.onSelectEvent(this.totalEvents - 1);
        break;
    }
  }

  playSubUnsubscribe(): void {
    if (this.playSub) {
      this.playSub.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.playSubUnsubscribe();
  }

}
