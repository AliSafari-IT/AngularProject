import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmployeeFormComponent } from './addedit-employee-form.component';

describe('AddEmployeeFormComponent', () => {
  let component: AddEditEmployeeFormComponent;
  let fixture: ComponentFixture<AddEditEmployeeFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditEmployeeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 
});
