import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Computers } from '../models/computers.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComputerService {
  compAddress: string = environment.apiRoot + 'computers';

  constructor(private _http: HttpClient) {}

  getComputers(): Observable<Computers[]> {
    return this._http.get<Computers[]>(this.compAddress);
  }

  getComputer(id: number): Observable<Computers> {
    return this._http.get<Computers>(`${this.compAddress}/${id}`);
  }

  postComputer(computer: Computers): Observable<Computers> {
    return this._http.post<Computers>(this.compAddress, computer);
  }

  putComputer(computadorId: number, dados: Computers): Observable<Computers> {
    return this._http.put<Computers>(`${this.compAddress}/${computadorId}`, dados);  // Especificando o tipo correto
  }

  deleteComputer(id: number): Observable<any> {
    return this._http.delete(`${this.compAddress}/${id}`);
  }

  toggleRetirado(id: number): Observable<Computers> {
    return this._http.put<Computers>(`${this.compAddress}/${id}/toggle-retiro`, {});
  }
}