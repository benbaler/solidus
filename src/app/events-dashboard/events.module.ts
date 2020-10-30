import { EventsDashboardComponent } from './events-dashboard.component';
import { EventsTableComponent } from './events-table/events-table.component';
import { EventBoxComponent } from './event-box/event-box.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EventPlayerComponent } from './event-player/event-player.component';
import { EventOrderbookComponent } from './event-orderbook/event-orderbook.component';

@NgModule({
  declarations: [
    EventsDashboardComponent,
    EventBoxComponent,
    EventsTableComponent,
    EventPlayerComponent,
    EventOrderbookComponent
  ],
  imports: [
    BrowserModule,
  ]
})
export class EventsModule { }
