import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment_dev } from '../../environments/environment.development';
import { HeroeI } from '../interface/heroe.interface';
import { toSignal } from '@angular/core/rxjs-interop';

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

  deleteHeroe(idHeroe: HeroeI): Observable<HeroeI> {
    return this._http.delete<HeroeI>(this._api + `/${idHeroe}`);
  }

  searchHeroe(query: string): Observable<HeroeI[]> {
    const nameHeroe = new HttpParams().set('name', query);
    return this._http.get<HeroeI[]>(this._api, { params: nameHeroe });
  }
}
