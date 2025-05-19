import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',    // ✅ remet templateUrl ici
  styleUrls: ['./layout.component.css']      // ✅ styleUrls au pluriel et tableau
})
export class LayoutComponent {
  logout() {
    console.log("Déconnexion"); // Ajoute ici la vraie logique si besoin
  }
}

