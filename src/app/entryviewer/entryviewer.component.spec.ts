import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryviewerComponent } from './entryviewer.component';

describe('EntryviewerComponent', () => {
  let component: EntryviewerComponent;
  let fixture: ComponentFixture<EntryviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
