import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
