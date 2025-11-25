import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmesPorMoodComponent } from './filmes-por-mood.component';

describe('FilmesPorMoodComponent', () => {
  let component: FilmesPorMoodComponent;
  let fixture: ComponentFixture<FilmesPorMoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmesPorMoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmesPorMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
