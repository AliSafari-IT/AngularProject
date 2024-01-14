import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuiExamplesComponent } from './mui-examples.component';

describe('MuiExamplesComponent', () => {
  let component: MuiExamplesComponent;
  let fixture: ComponentFixture<MuiExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuiExamplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MuiExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
