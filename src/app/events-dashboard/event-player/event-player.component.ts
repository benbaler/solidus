import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventActionTypes } from '../events-dashboard.component';

@Component({
  selector: 'app-event-player',
  templateUrl: './event-player.component.html',
  styleUrls: ['./event-player.component.css']
})
export class EventPlayerComponent implements OnInit {
  @Output() eventAction = new EventEmitter<EventActionTypes>();

  eventActionTypes = Object.values(EventActionTypes);

  constructor() { }

  ngOnInit(): void {
  }

  onEventAction(type: EventActionTypes): void {
    this.eventAction.emit(type);
  }

}
