import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produit } from '../../../../shared/models/produit.model';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-produit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './produit-form.component.html',
})
export class ProduitFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  matieresPremieres: { produit: Produit | null; qte: number }[] = [];

  @Input() produitsDisponibles: Produit[] = [];
  @Output() produitSaved = new EventEmitter<void>();

  @Input() produit: Produit | null = null;

  constructor(private fb: FormBuilder, private produitService: ProduitService) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      fournisseur: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['produit'] || changes['produitsDisponibles']) {
      this.bindProduitToForm();
    }
  }

  private bindProduitToForm(): void {
    if (this.produit && this.produitsDisponibles.length > 0) {
      this.form.patchValue(this.produit);

      this.matieresPremieres = (this.produit.matieresPremieres || []).map((ligne) => ({
        qte: ligne.qte,
        produit: this.produitsDisponibles.find((p) => p.id === ligne.produit?.id) || null,
      }));
    }
  }

  addLigne(): void {
    this.matieresPremieres.push({ produit: null, qte: 0 });
  }

  removeLigne(index: number): void {
    this.matieresPremieres.splice(index, 1);
  }

  submit(): void {
    if (this.form.invalid) return;

    const produitToSend: Produit = {
      ...this.form.value,
      id: this.produit?.id || undefined,
      matieresPremieres: this.matieresPremieres
        .filter((l) => l.produit)
        .map((l) => ({
          produit: l.produit!,
          qte: l.qte,
        })),
    };

    const request = this.produit
      ? this.produitService.update(this.produit.id!, produitToSend)
      : this.produitService.create(produitToSend);

    request.subscribe(() => {
      this.form.reset();
      this.matieresPremieres = [];
      this.produitSaved.emit();
    });
  }
}
