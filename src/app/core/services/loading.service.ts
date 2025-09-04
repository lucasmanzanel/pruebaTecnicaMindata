import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _loading = signal(0);
  loading = computed(() => this._loading() > 0);

  start() {
    this._loading.set(this._loading() + 1);
  }

  stop() {
    this._loading.set(Math.max(this._loading() - 1, 0));
  }
}
