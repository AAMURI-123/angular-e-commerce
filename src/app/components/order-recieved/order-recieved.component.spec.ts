import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRecievedComponent } from './order-recieved.component';

describe('OrderRecievedComponent', () => {
  let component: OrderRecievedComponent;
  let fixture: ComponentFixture<OrderRecievedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRecievedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
