import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-orderbook',
  templateUrl: './event-orderbook.component.html',
  styleUrls: ['./event-orderbook.component.css']
})
export class EventOrderbookComponent implements OnInit {
  @Input() snapshot: { BID: string[], ASK: string[] };

  constructor() { }

  ngOnInit(): void {
  }

}
