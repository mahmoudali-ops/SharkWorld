import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUpdateComponent } from './about-update.component';

describe('AboutUpdateComponent', () => {
  let component: AboutUpdateComponent;
  let fixture: ComponentFixture<AboutUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
