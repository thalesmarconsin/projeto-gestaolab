import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLaboratorieComponent } from './create-laboratorie.component';

describe('CreateLaboratorieComponent', () => {
  let component: CreateLaboratorieComponent;
  let fixture: ComponentFixture<CreateLaboratorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLaboratorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLaboratorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
