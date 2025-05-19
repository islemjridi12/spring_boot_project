import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Produit} from "../../../shared/models/produit.model";


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://localhost:8081/api/produits'; // à adapter si différent

  constructor(private http: HttpClient) {}

  // 🔹 Liste de tous les produits
  getAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  // 🔹 Détails d’un produit par ID
  getById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Créer un produit (avec matières premières incluses)
  create(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  // 🔹 Modifier un produit
  update(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit);
  }

  // 🔹 Supprimer un produit
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
