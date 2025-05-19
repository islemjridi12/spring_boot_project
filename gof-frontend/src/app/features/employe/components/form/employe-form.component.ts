import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeService } from '../../services/employe.service';
import { MachineService } from '../../../machine/services/machine.service';
import { Employe } from '../../../../shared/models/employe.model';
import { Machine } from '../../../../shared/models/machine.model';
import {EmployeRequest} from "../../../../shared/models/employe-request.model";

@Component({
  selector: 'app-employe-form',
  templateUrl: './employe-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class EmployeFormComponent implements OnInit {
  @Input() employe: Employe | null = null;
  @Output() employeAjoute = new EventEmitter<void>();

  form!: FormGroup;
  machinesDisponibles: Machine[] = [];

  private fb = inject(FormBuilder);
  private employeService = inject(EmployeService);
  private machineService = inject(MachineService);

  ngOnInit() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      poste: ['', Validators.required],
      machineAssigneeId: [null],
    });

    if (this.employe) {
      this.form.patchValue({
        nom: this.employe.nom,
        poste: this.employe.poste,
        machineAssigneeId: this.employe.machineAssignee?.id ?? null,
      });
    }

    this.machineService.getAvailableMachines().subscribe(machines => {
      this.machinesDisponibles = machines;
    });
  }

  submit() {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const payload: EmployeRequest = {
      nom: formValue.nom,
      poste: formValue.poste,
      machineAssigneeId: formValue.machineAssigneeId || null
    };

    if (this.employe?.id) {
      this.employeService.update(this.employe.id, payload).subscribe(() => {
        this.employeAjoute.emit();
      });
    } else {
      this.employeService.create(payload).subscribe(() => {
        this.employeAjoute.emit();
      });
    }
  }

}

