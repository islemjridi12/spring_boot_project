import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {OrdreFabrication} from "../../../shared/models/ordre-fabrication.model";

@Injectable({
  providedIn: 'root'
})
export class OrdreFabricationService {
  private apiUrl = 'http://localhost:8081/api/ordres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(this.apiUrl);
  }

  create(dto: OrdreFabrication): Observable<OrdreFabrication> {
    return this.http.post<OrdreFabrication>(this.apiUrl, dto);
  }

  update(id: number, dto: OrdreFabrication): Observable<OrdreFabrication> {
    return this.http.put<OrdreFabrication>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  startProduction(id: number): Observable<OrdreFabrication> {
    return this.http.put<OrdreFabrication>(`${this.apiUrl}/${id}/start`, {});
  }

  declareProduction(id: number): Observable<OrdreFabrication> {
    return this.http.put<OrdreFabrication>(`${this.apiUrl}/${id}/declare`, {});
  }

  findByEtat(etat: string): Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(`${this.apiUrl}/etat/${etat}`);
  }
}
