import { EventsService } from './events.service';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { EventActionTypes, EventsDashboardComponent } from './events-dashboard.component';
import { Observable, of } from 'rxjs';
import { SingleEvent, EventStatus } from './event.model';

const EVENTS_MOCK = [
  new SingleEvent(1580966966640, 100, EventStatus.NEW, { BID: [], ASK: [] }),
  new SingleEvent(1580966967640, 200, EventStatus.NEW, { BID: [], ASK: [] }),
  new SingleEvent(1580966968640, 300, EventStatus.NEW, { BID: [], ASK: [] }),
];

class EventServiceMock {
  getEventsObservable(): Observable<SingleEvent[]> {
    return of(EVENTS_MOCK);
  }
}

describe('EventsDashboardComponent', () => {
  let component: EventsDashboardComponent;
  let fixture: ComponentFixture<EventsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsDashboardComponent],
      providers: [
        {
          provide: EventsService, useClass: EventServiceMock
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set events observable', done => {
      expect(component.events$).toBeTruthy();
      component.events$.subscribe(events => {
        expect(events).toBe(EVENTS_MOCK);
        done();
      });
    });

    it('should set total events to be the length of events', () => {
      expect(component.totalEvents).toBe(3);
    });

    it('should set selected event observable', done => {
      expect(component.selectedEvent$).toBeTruthy();
      component.selectedEvent$.subscribe(event => {
        expect(event).toBe(EVENTS_MOCK[0]);
        done();
      });
    });
  });

  describe('onSelectEvent', () => {
    it('should select event by index', done => {
      component.onSelectEvent(1);
      component.selectedEvent$.subscribe(event => {
        expect(event).toBe(EVENTS_MOCK[1]);
        done();
      });
    });

    it('should select the fisrt event event', done => {
      component.onSelectEvent(-1);
      component.selectedEvent$.subscribe(event => {
        expect(event).toBe(EVENTS_MOCK[0]);
        done();
      });
    });

    it('should select the last event event', done => {
      // Selecting a non existing index.
      component.onSelectEvent(3);
      component.selectedEvent$.subscribe(event => {
        expect(event).toBe(EVENTS_MOCK[2]);
        done();
      });
    });
  });

  describe('onEventAction', () => {
    it('should select the first event', done => {
      component.onSelectEvent(1);
      component.onEventAction(EventActionTypes.FIRST);
      component.selectedEvent$.subscribe(event => {
        expect(event).toBe(EVENTS_MOCK[0]);
        done();
      });
    });
    it('should select the previous event', done => {
      component.onSelectEvent(2);
      component.onEventAction(EventActionTypes.PREVIOUS);
      component.selectedEvent$.subscribe(event => {
        expect(event).toBe(EVENTS_MOCK[0]);
        done();
      });
    });
    it('should select the next event each second', fakeAsync(() => {
      let currentEvent;
      component.onEventAction(EventActionTypes.PLAY);
      const sub1 = component.selectedEvent$.subscribe(event => {
        currentEvent = event;
      });
      expect(currentEvent).toBe(EVENTS_MOCK[0]);
      tick(1000);
      const sub2 = component.selectedEvent$.subscribe(event => {
        currentEvent = event;
      });
      expect(currentEvent).toBe(EVENTS_MOCK[1]);
      tick(1000);
      const sub3 = component.selectedEvent$.subscribe(event => {
        currentEvent = event;
      });
      expect(currentEvent).toBe(EVENTS_MOCK[2]);
      component.playSubUnsubscribe();
      sub1.unsubscribe();
      sub2.unsubscribe();
      sub3.unsubscribe();
    }));
    it('should pause selecting events', fakeAsync(() => {
      let currentEvent;
      component.onEventAction(EventActionTypes.PLAY);
      const sub1 = component.selectedEvent$.subscribe(event => {
        currentEvent = event;
      });
      expect(currentEvent).toBe(EVENTS_MOCK[0]);
      tick(1000);
      const sub2 = component.selectedEvent$.subscribe(event => {
        currentEvent = event;
      });
      expect(currentEvent).toBe(EVENTS_MOCK[1]);
      component.onEventAction(EventActionTypes.PAUSE);
      tick(1000);
      const sub3 = component.selectedEvent$.subscribe(event => {
        currentEvent = event;
      });
      expect(currentEvent).toBe(EVENTS_MOCK[1]);
      component.playSubUnsubscribe();
      sub1.unsubscribe();
      sub2.unsubscribe();
      sub3.unsubscribe();
    }));
    it('should select the next event', done => {
      component.onEventAction(EventActionTypes.NEXT);
      component.selectedEvent$.subscribe(event => {
        expect(event).toBe(EVENTS_MOCK[1]);
        done();
      });
    });
    it('should select the last event', done => {
      component.onEventAction(EventActionTypes.LAST);
      component.selectedEvent$.subscribe(event => {
        expect(event).toBe(EVENTS_MOCK[2]);
        done();
      });
    });
  });
});
