import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroeI } from '../interfaces/heroe.interface';
import { environment_dev } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  private _api = `${environment_dev.URL_LOCAL}` + '/heroes';
  private _http = inject(HttpClient);
    
  addHeroe(heroe: HeroeI): Observable<HeroeI> {
    return this._http.post<HeroeI>(this._api, heroe);
  }

  allHeroes(): Observable<HeroeI[]> {
    return this._http.get<HeroeI[]>(this._api);
  }

  getHeroe(idHeroe: HeroeI): Observable<HeroeI> {
    return this._http.get<HeroeI>(this._api + `/${idHeroe}`);
  }

  updateHeroe(heroe: HeroeI): Observable<HeroeI> {
    return this._http.put<HeroeI>(this._api + `/${heroe.id}`, heroe);
  }

  deleteHeroe(idHeroe: number): Observable<HeroeI> {
    return this._http.delete<HeroeI>(this._api + `/${idHeroe}`);
  }

  searchHeroe(query: string): Observable<HeroeI[]> {
    const params = new HttpParams().set('nombre_like', query);
    return this._http.get<HeroeI[]>(this._api, { params });
  }
}
