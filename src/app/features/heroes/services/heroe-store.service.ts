import { Injectable, signal, computed, inject } from '@angular/core';
import { HeroeI } from '../interfaces/heroe.interface';
import { catchError, of } from 'rxjs';
import { HeroeService } from './heroe.service';

@Injectable({ providedIn: 'root' })
export class HeroeStoreService {
  private _heroes = signal<HeroeI[]>([]);
  heroes = computed(() => this._heroes());
  heroService = inject(HeroeService);

  constructor() {
    this.heroService
      .allHeroes()
      .pipe(catchError(() => of([])))
      .subscribe((h) => this._heroes.set(h));
  }

  addHeroe(heroe: HeroeI) {
    this.heroService.addHeroe(heroe).subscribe((h) => {
      this._heroes.set([...this._heroes(), h]);
    });
  }

  updateHeroe(heroe: HeroeI) {
    this.heroService.updateHeroe(heroe).subscribe((h) => {
      const lista = this._heroes().map((x) => (x.id === h.id ? h : x));
      this._heroes.set(lista);
    });
  }

  deleteHeroe(id: number) {
    this.heroService.deleteHeroe(id).subscribe(() => {
      this._heroes.set(this._heroes().filter((h) => h.id !== id));
    });
  }
}
