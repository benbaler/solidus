import { Component, Input, OnInit } from '@angular/core';

import { SingleEvent } from '../event.model';

@Component({
  selector: 'app-event-box',
  templateUrl: './event-box.component.html',
  styleUrls: ['./event-box.component.css']
})
export class EventBoxComponent implements OnInit {
  @Input() event: SingleEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
