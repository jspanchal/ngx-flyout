import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutComponent } from './flyout.component';

describe('FlyoutComponent', () => {
  let component: FlyoutComponent;
  let fixture: ComponentFixture<FlyoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
