import { Component, inject } from '@angular/core';
import { RouterModule, Router } from "@angular/router";
import {AuthService} from "../core/services/auth.service";
 // adapte le chemin si besoin

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.auth.logout();               // vide le localStorage
    this.router.navigate(['/login']); // redirige vers la page de login
  }
}
