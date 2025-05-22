import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdreFabrication } from '../../../../shared/models/ordre-fabrication.model';
import { Produit } from '../../../../shared/models/produit.model';
import { OrdreFabricationService } from '../../services/ordre-fabrication.service';
import { ProduitService } from '../../../produit/services/produit.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-ordre-fabrication-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FormComponent],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  ordres: OrdreFabrication[] = [];
  filteredOrdres: OrdreFabrication[] = [];
  produitsDisponibles: Produit[] = [];
  showForm = false;

  searchText: string = '';
  etatFiltre: string = 'ALL';
  etats = ['EN_ATTENTE', 'EN_PRODUCTION', 'DECLARE'];

  constructor(
    private ordreService: OrdreFabricationService,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.ordreService.getAll().subscribe((data: OrdreFabrication[]) => {
      this.ordres = data;
      this.filterOrdres();
    });

    this.produitService.getAll().subscribe((data: Produit[]) => {
      this.produitsDisponibles = data;
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  ajouter(ordre: OrdreFabrication): void {
    this.ordreService.create(ordre).subscribe(() => {
      this.showForm = false;
      this.loadData();
    });
  }

  errorMessage: string | null = null;

  lancerProduction(id: number): void {
    this.errorMessage = null;

    this.ordreService.startProduction(id).subscribe({
      next: () => this.loadData(),
      error: (err) => {
        // ✅ Extraction du vrai message lisible
        const msg =
          typeof err.error === 'string'
            ? err.error
            : err.error?.message || err.message || 'Erreur inconnue';

        this.errorMessage = msg;
        setTimeout(() => this.errorMessage = null, 5000);
      }
    });
  }



  declarerProduction(id: number): void {
    this.ordreService.declareProduction(id).subscribe(() => this.loadData());
  }

  supprimer(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet ordre ?')) {
      this.ordreService.delete(id).subscribe(() => this.loadData());
    }
  }

  filterOrdres(): void {
    const search = this.searchText.toLowerCase();
    const etat = this.etatFiltre;

    this.filteredOrdres = this.ordres.filter(o =>
      (o.projet.toLowerCase().includes(search) || o.produit.nom.toLowerCase().includes(search)) &&
      (etat === 'ALL' || o.etat === etat)
    );
  }
}
