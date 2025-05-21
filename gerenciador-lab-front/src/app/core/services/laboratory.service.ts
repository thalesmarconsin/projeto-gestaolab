import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Laboratory } from '../models/laboratory.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LaboratoryService {
  labAddress = environment.apiRoot + 'laboratories';

  constructor(private _http: HttpClient) {}

  getLaboratories(): Observable<Laboratory[]> {
    return this._http.get(this.labAddress) as Observable<Laboratory[]>;
  }

  getLaboratory(id: number): Observable<{ laboratorio: Laboratory }> {
    return this._http.get<{ laboratorio: Laboratory }>(`${this.labAddress}/${id}`);
  }

  postLaboratory(lab: Laboratory): Observable<Laboratory> {
    return this._http.post(this.labAddress, lab) as Observable<Laboratory>;
  }

  putLaboratory(id: number, lab: Laboratory): Observable<Laboratory> {
    return this._http.put(`${this.labAddress}/${id}`, lab) as Observable<Laboratory>;
  }

  deleteLaboratory(id: number): Observable<any> {
    return this._http.delete(`${this.labAddress}/${id}`);
  }
}
