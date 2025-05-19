import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../../../shared/models/produit.model';
import { ProduitFormComponent } from '../produit-form/produit-form.component';

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [
    CommonModule,
    ProduitFormComponent
  ],
  templateUrl: './produit-list.component.html',
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];
  produitsDisponibles: Produit[] = [];
  selectedProduit: Produit | null = null;
  showForm = false;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.getAll().subscribe(data => {
      this.produits = data;
      this.produitsDisponibles = data; // on remplit aussi la liste disponible
    });
  }

  addProduit(): void {
    this.selectedProduit = null;
    this.showForm = true;
  }

  editProduit(produit: Produit): void {
    this.selectedProduit = null; // permet de forcer le reset du form
    setTimeout(() => {
      this.selectedProduit = produit;
      this.showForm = true;
    }, 0);
  }

  deleteProduit(id: number): void {
    this.produitService.delete(id).subscribe(() => this.loadProduits());
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
