import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { loadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../services/loading.service';
import { Observable, of } from 'rxjs';

describe('loadingInterceptor', () => {
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService, provideHttpClient(withInterceptorsFromDi())],
    });

    loadingService = TestBed.inject(LoadingService);
  });

  it('Debe iniciar y finalizar cuando haya data', fakeAsync(() => {
    const req = {} as any;

    const next = (req: any) =>
      of(new HttpResponse({ body: {} })) as unknown as Observable<
        HttpEvent<unknown>
      >;

    const interceptorFn: HttpInterceptorFn = (req, next) =>
      TestBed.runInInjectionContext(() => loadingInterceptor(req, next));

    expect(loadingService.loading()).toBeFalse();

    interceptorFn(req, next).subscribe();
    expect(loadingService.loading()).toBeTrue();

    tick(1000);
    expect(loadingService.loading()).toBeFalse();
  }));
});
