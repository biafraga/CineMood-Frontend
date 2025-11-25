import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  moods = [
    { id: 1, label: 'Otimista', color: '#F7D774' },
    { id: 2, label: 'Nostálgico', color: '#F4B5C5' },
    { id: 3, label: 'Inspirado', color: '#50EFE7' },
    { id: 4, label: 'Empolgado', color: '#FF9F68' },
    { id: 5, label: 'Reflexivo', color: '#8C5CFF' },
    { id: 6, label: 'Surpreso', color: '#b1f72fff' },
    { id: 7, label: 'Emocionado', color: '#FF6B6B' },
    { id: 8, label: 'Despreocupado', color: '#74B9FF' },
    { id: 9, label: 'Diferentão', color: '#87ec5bff' }
  ];

  constructor(private router: Router) {}

  selectMood(moodId: number) {
    this.router.navigate(['/filmes/mood', moodId]);
  }

}
