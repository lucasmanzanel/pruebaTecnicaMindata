import { TestBed } from '@angular/core/testing';

import { HeroeService } from './heroe.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HeroeI } from '../interface/heroe.interface';
import { provideHttpClient } from '@angular/common/http';

describe('HeroeService', () => {
  let service: HeroeService;
  let httpMock: HttpTestingController;

  const pruebaHeroes: HeroeI[] = [
    { id: 1, nombre: 'Batman' },
    { id: 2, nombre: 'Spiderman' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroeService, 
        provideHttpClient(),
        provideHttpClientTesting()],
    });
    service = TestBed.inject(HeroeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Servicio creado', () => {
    expect(service).toBeTruthy();
  });

    it('Debe agregar nuevo heroe', () => {
    const newHero: HeroeI = { id: 3, nombre: 'Superman' };

    service.addHeroe(newHero).subscribe(hero => {
      expect(hero).toEqual(newHero);
    });

    const req = httpMock.expectOne(service['_api']);
    expect(req.request.method).toBe('POST');
    req.flush(newHero);
  });

    it('Debe retornar todos los heroes', () => {
    service.allHeroes().subscribe(heroes => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(pruebaHeroes);
    });

    const req = httpMock.expectOne(service['_api']);
    expect(req.request.method).toBe('GET');
    req.flush(pruebaHeroes);
  });

    it('Debe actualizar heroe', () => {
    const updatedHero = { ...pruebaHeroes[0] };

    service.updateHeroe(updatedHero).subscribe(res => {
      expect(res).toEqual(updatedHero);
    });

    const req = httpMock.expectOne(`${service['_api']}/${updatedHero.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedHero);
  });


    it('Debe eliminar un heroe', () => {
    const hero = pruebaHeroes[0];

    service.deleteHeroe(hero.id).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['_api']}/${hero.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });


    it('Debe realizar una busqueda de heroe', () => {
    const query = 'man';
    const result = [pruebaHeroes[0], pruebaHeroes[1]];

    service.searchHeroe(query).subscribe(res => {
      expect(res).toEqual(result);
    });

    const req = httpMock.expectOne(r => r.url === service['_api'] && r.params.get('nombre_like') === query);
    expect(req.request.method).toBe('GET');
    req.flush(result);
  });

});
