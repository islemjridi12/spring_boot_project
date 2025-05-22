import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MachineService} from "../../machine/services/machine.service";
import {EmployeService} from "../../employe/services/employe.service";
import {ProduitService} from "../../produit/services/produit.service";
import {OrdreFabricationService} from "../../ordre-fabrication/services/ordre-fabrication.service";



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  totalMachines = 0;
  totalEmployes = 0;
  totalProduits = 0;
  totalOrdres = 0;

  constructor(
    private machineService: MachineService,
    private employeService: EmployeService,
    private produitService: ProduitService,
    private ordreService: OrdreFabricationService
  ) {}

  ngOnInit(): void {
    this.machineService.getAll().subscribe(data => this.totalMachines = data.length);
    this.employeService.getAll().subscribe(data => this.totalEmployes = data.length);
    this.produitService.getAll().subscribe(data => this.totalProduits = data.length);
    this.ordreService.getAll().subscribe(data => this.totalOrdres = data.length);
  }
}
