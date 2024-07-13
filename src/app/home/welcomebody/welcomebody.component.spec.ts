import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomebodyComponent } from './welcomebody.component';

describe('WelcomebodyComponent', () => {
  let component: WelcomebodyComponent;
  let fixture: ComponentFixture<WelcomebodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomebodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomebodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
