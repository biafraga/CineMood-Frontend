import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmesModalComponent } from './filmes-modal.component';

describe('FilmesModalComponent', () => {
  let component: FilmesModalComponent;
  let fixture: ComponentFixture<FilmesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
