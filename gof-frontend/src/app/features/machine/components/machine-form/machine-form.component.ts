import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MachineService } from '../../services/machine.service';
import { Machine } from '../../../../shared/models/machine.model';
import {EtatMachine} from "../../../../shared/models/etatMachine.model";

@Component({
  selector: 'app-machine-form',
  standalone: true,
  templateUrl: './machine-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class MachineFormComponent implements OnInit {
  @Input() machine: Machine | null = null;
  @Output() machineAjoute = new EventEmitter<void>();

  form!: FormGroup;

  private fb = inject(FormBuilder);
  private machineService = inject(MachineService);
  etats = Object.values(EtatMachine); // à jour avec les valeurs actuelles


  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      etat: ['DISPONIBLE', Validators.required],
      derniereMaintenance: ['', Validators.required]
    });

    if (this.machine) {
      this.form.patchValue({
        nom: this.machine.nom,
        etat: this.machine.etat,
        derniereMaintenance: this.machine.derniereMaintenance
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    if (this.machine?.id) {
      console.log('Updating machine with ID:', this.machine.id);
      this.machineService.update(this.machine.id, formValue).subscribe(() => {
        this.machineAjoute.emit();
      });
    } else {
      console.log(formValue);
      this.machineService.create(formValue).subscribe(() => {
        this.machineAjoute.emit();
      });
    }
  }
}
