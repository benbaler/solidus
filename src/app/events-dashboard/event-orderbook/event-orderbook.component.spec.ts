import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrderbookComponent } from './event-orderbook.component';

describe('EventOrderbookComponent', () => {
  let component: EventOrderbookComponent;
  let fixture: ComponentFixture<EventOrderbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventOrderbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOrderbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
