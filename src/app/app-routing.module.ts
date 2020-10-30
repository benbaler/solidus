import { EventsModule } from './events-dashboard/events.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: EventsDashboardComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EventsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
