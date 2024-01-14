import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLogContentComponent } from './change-log-content.component';

describe('ChangeLogContentComponent', () => {
  let component: ChangeLogContentComponent;
  let fixture: ComponentFixture<ChangeLogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeLogContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeLogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
