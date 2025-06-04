import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComputerComponent } from './create-computer.component';

describe('CreateComputerComponent', () => {
  let component: CreateComputerComponent;
  let fixture: ComponentFixture<CreateComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateComputerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
