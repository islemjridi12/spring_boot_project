import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Employe } from '../../../../shared/models/employe.model';
import { EmployeService } from '../../services/employe.service';
import { EmployeFormComponent } from "../form/employe-form.component";

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EmployeFormComponent],
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  employes: Employe[] = [];
  showForm = false;
  selectedEmploye: Employe | null = null;

  constructor(private employeService: EmployeService) {}

  ngOnInit(): void {
    this.loadEmployes();
  }

  loadEmployes(): void {
    this.employeService.getAll().subscribe({
      next: (data) => this.employes = data,
      error: (err) => console.error('Erreur chargement employés :', err)
    });
  }

  toggleForm(): void {
    this.selectedEmploye = null;
    this.showForm = !this.showForm;
  }

  editEmploye(emp: Employe) {
    this.selectedEmploye = { ...emp };
    this.showForm = true;
  }

  onEmployeAjoute(): void {
    this.loadEmployes();
    this.showForm = false;
    this.selectedEmploye = null;
  }

  deleteEmploye(id: number): void {
    this.employeService.delete(id).subscribe({
      next: () => this.loadEmployes(),
      error: (err) => console.error('Erreur suppression employé :', err)
    });
  }
}
