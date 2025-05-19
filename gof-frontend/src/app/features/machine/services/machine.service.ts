import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine } from '../../../shared/models/machine.model';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private apiUrl = 'http://localhost:8081/api/machines';

  constructor(private http: HttpClient) {}

  getAvailableMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.apiUrl}/disponibles`);
  }

  getAll(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.apiUrl);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  create(machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(this.apiUrl, machine);
  }

  update(id: number, machine: Machine): Observable<Machine> {
    return this.http.put<Machine>(`${this.apiUrl}/${id}`, machine);
  }

}
