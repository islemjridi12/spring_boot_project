import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MachineService } from '../../services/machine.service';
import { Machine } from '../../../../shared/models/machine.model';
import { EtatMachine } from '../../../../shared/models/etatMachine.model';
import { MachineFormComponent } from '../machine-form/machine-form.component';

@Component({
  selector: 'app-machine-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MachineFormComponent],
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {
  machines: Machine[] = [];
  filteredMachines: Machine[] = [];

  showForm = false;
  selectedMachine: Machine | null = null;

  searchText: string = '';
  etatFiltre: string = 'ALL';

  EtatMachine = EtatMachine;
  etats = Object.values(EtatMachine);

  constructor(private machineService: MachineService) {}

  ngOnInit(): void {
    this.loadMachines();
  }

  loadMachines(): void {
    this.machineService.getAll().subscribe(data => {
      this.machines = data;
      this.filterMachines();
    });
  }

  toggleForm(): void {
    this.selectedMachine = null;
    this.showForm = !this.showForm;
  }

  onMachineAjoute(): void {
    this.loadMachines();
    this.selectedMachine = null;
    this.showForm = false;
  }

  editMachine(machine: Machine): void {
    this.selectedMachine = { ...machine };
    this.showForm = true;
  }

  deleteMachine(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette machine ?')) {
      this.machineService.delete(id).subscribe(() => this.loadMachines());
    }
  }

  filterMachines(): void {
    const term = this.searchText.toLowerCase();
    const etat = this.etatFiltre;

    this.filteredMachines = this.machines.filter(machine =>
      machine.nom.toLowerCase().includes(term) &&
      (etat === 'ALL' || machine.etat === etat)
    );
  }
}
