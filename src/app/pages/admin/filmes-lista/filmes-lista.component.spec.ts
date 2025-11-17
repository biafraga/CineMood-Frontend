import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmesListaComponent } from './filmes-lista.component';

describe('FilmesListaComponent', () => {
  let component: FilmesListaComponent;
  let fixture: ComponentFixture<FilmesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmesListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
