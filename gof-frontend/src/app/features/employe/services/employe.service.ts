import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../../../shared/models/employe.model';
import {EmployeRequest} from "../../../shared/models/employe-request.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = 'http://localhost:8081/api/employes';  // 🔁 adapte au backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.apiUrl);
  }

  create(employe: EmployeRequest): Observable<any> {
    return this.http.post(this.apiUrl, employe);
  }

  update(id: number, employe: EmployeRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, employe);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignMachine(employeId: number, machineId: number): Observable<Employe> {
    return this.http.put<Employe>(`${this.apiUrl}/assign/${employeId}/${machineId}`, {});
  }
}
