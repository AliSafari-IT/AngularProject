import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePersonListComponent } from './employee-person-list.component';

describe('EmployeePersonListComponent', () => {
  let component: EmployeePersonListComponent;
  let fixture: ComponentFixture<EmployeePersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePersonListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeePersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
