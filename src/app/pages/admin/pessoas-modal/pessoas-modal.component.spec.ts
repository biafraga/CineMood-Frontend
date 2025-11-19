import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasModalComponent } from './pessoas-modal.component';

describe('PessoasModalComponent', () => {
  let component: PessoasModalComponent;
  let fixture: ComponentFixture<PessoasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoasModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
