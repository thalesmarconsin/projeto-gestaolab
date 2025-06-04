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
    return this._http.get(this.compAddress) as Observable<Computers[]>;
  }

  getComputer(id: number): Observable<Computers> {
  return this._http.get<Computers>(`${this.compAddress}/${id}`);
  }

  postComputer(computer: Computers): Observable<Computers> {
    return this._http.post(this.compAddress, computer) as Observable<Computers>;
  }

  putComputer(id: number, computer: Computers): Observable<Computers> {
    return this._http.put(`${this.compAddress}/${id}`, computer) as Observable<Computers>;
  }

  deleteComputer(id: number): Observable<any> {
    return this._http.delete(`${this.compAddress}/${id}`);
  }

  toggleRetirado(id: number): Observable<Computers> {
    return this._http.put(`${this.compAddress}/${id}/toggle-retiro`, {}) as Observable<Computers>;
  }
}
