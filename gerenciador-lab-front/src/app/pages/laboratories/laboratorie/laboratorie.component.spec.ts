import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorieComponent } from './laboratorie.component';

describe('LaboratorieComponent', () => {
  let component: LaboratorieComponent;
  let fixture: ComponentFixture<LaboratorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaboratorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
