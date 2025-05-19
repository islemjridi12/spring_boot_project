import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdreFabrication } from '../../../../shared/models/ordre-fabrication.model';
import { Produit } from '../../../../shared/models/produit.model';
import { OrdreFabricationService } from '../../services/ordre-fabrication.service';

import { FormComponent } from '../form/form.component';
import {ProduitService} from "../../../produit/services/produit.service";

@Component({
  selector: 'app-ordre-fabrication-list',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  ordres: OrdreFabrication[] = [];
  produitsDisponibles: Produit[] = [];
  showForm = false;

  constructor(
    private ordreService: OrdreFabricationService,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.ordreService.getAll().subscribe((data: OrdreFabrication[]) => this.ordres = data);
    this.produitService.getAll().subscribe((data: Produit[]) => this.produitsDisponibles = data);
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


  lancerProduction(id: number): void {
    this.ordreService.startProduction(id).subscribe({
      next: () => this.loadData(),
      error: (err) => {
        const msg = err.error?.message || 'Erreur lors du lancement de la production';
        alert(msg);
      }
    });
  }


  declarerProduction(id: number): void {
    this.ordreService.declareProduction(id).subscribe(() => this.loadData());
  }

  supprimer(id: number): void {
    this.ordreService.delete(id).subscribe(() => this.loadData());
  }
}
