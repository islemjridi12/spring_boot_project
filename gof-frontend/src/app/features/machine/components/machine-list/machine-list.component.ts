import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineService } from '../../services/machine.service';

import { RouterModule } from '@angular/router';
import {Machine} from "../../../../shared/models/machine.model";
import {MachineFormComponent} from "../machine-form/machine-form.component";

@Component({
  selector: 'app-machine-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MachineFormComponent],
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {
  machines: Machine[] = [];

  constructor(private machineService: MachineService) {}

  ngOnInit(): void {
    this.loadMachines();
  }
  showForm = false;
  selectedMachine: any = null;

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onMachineAjoute() {
    this.toggleForm();
    this.selectedMachine = null;
    this.loadMachines();
  }

  editMachine(machine: any) {
    this.selectedMachine = { ...machine }; // clone
    this.showForm = true;
  }

  loadMachines() {
    this.machineService.getAll().subscribe(data => {
      this.machines = data;
    });
  }

  deleteMachine(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette machine ?')) {
      this.machineService.delete(id).subscribe(() => {
        this.loadMachines();
      });
    }
  }
}
