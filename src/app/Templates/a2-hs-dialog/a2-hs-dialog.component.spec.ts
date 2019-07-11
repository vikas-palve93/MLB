import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A2HSDialogComponent } from './a2-hs-dialog.component';

describe('A2HSDialogComponent', () => {
  let component: A2HSDialogComponent;
  let fixture: ComponentFixture<A2HSDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A2HSDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A2HSDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
