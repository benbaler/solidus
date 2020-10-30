import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SingleEvent } from '../event.model';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent {
  @Input() events: SingleEvent[];
  @Output() selectEvent = new EventEmitter<number>();

  constructor() { }

  onSelectEvent(index: number): void {
    this.selectEvent.emit(index);
  }

  // Sorting events table by selected key.
  // With a future option to pass the way of ordering the result (ascending or descending).
  onSortEvents(key: string, desc: boolean = false): void {
    this.events = this.events.sort((a, b) => {
      if (a[key] < b[key]) {
        return desc ? 1 : -1;
      }
      if (a[key] > b[key]) {
        return desc ? -1 : 1;
      }
      return 0;
    });
  }

}
