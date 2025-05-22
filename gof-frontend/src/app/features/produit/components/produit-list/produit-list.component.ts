import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../../../shared/models/produit.model';
import { ProduitFormComponent } from '../produit-form/produit-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProduitFormComponent],
  templateUrl: './produit-list.component.html',
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];
  produitsDisponibles: Produit[] = [];

  selectedProduit: Produit | null = null;
  showForm = false;
  searchText: string = '';

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.getAll().subscribe(data => {
      this.produits = data;
      this.produitsDisponibles = data;
      this.filterProduits();
    });
  }

  filterProduits(): void {
    const term = this.searchText.toLowerCase();
    this.filteredProduits = this.produits.filter(p =>
      p.nom.toLowerCase().includes(term) ||
      p.type.toLowerCase().includes(term) ||
      p.fournisseur.toLowerCase().includes(term)
    );
  }

  addProduit(): void {
    this.selectedProduit = null;
    this.showForm = true;
  }

  editProduit(produit: Produit): void {
    this.selectedProduit = null;
    setTimeout(() => {
      this.selectedProduit = produit;
      this.showForm = true;
    }, 0);
  }

  deleteProduit(id: number): void {
    if (confirm("Confirmer la suppression ?")) {
      this.produitService.delete(id).subscribe(() => this.loadProduits());
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedProduit = null;
  }

  onProduitSaved(): void {
    this.showForm = false;
    this.selectedProduit = null;
    this.loadProduits();
  }
}
