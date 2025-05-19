import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Produit } from '../../../../shared/models/produit.model';
import { OrdreFabrication } from '../../../../shared/models/ordre-fabrication.model';

@Component({
  selector: 'app-ordre-fabrication-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  @Input() produitsDisponibles: Produit[] = [];
  @Input() ordre: OrdreFabrication | null = null;
  @Output() ordreAjoute = new EventEmitter<OrdreFabrication>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      projet: ['', Validators.required],
      produit: [null, Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required]
    });

    if (this.ordre) {
      this.form.patchValue(this.ordre);
    }
  }

  submit(): void {
    if (this.form.valid) {
      this.ordreAjoute.emit(this.form.value);
    }
  }
}
