import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaboratorieComponent } from './edit-laboratorie.component';

describe('EditLaboratorieComponent', () => {
  let component: EditLaboratorieComponent;
  let fixture: ComponentFixture<EditLaboratorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLaboratorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLaboratorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
