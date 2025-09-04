import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HeroeStoreService } from '../services/heroe-store.service';
import { HeroeI } from '../interfaces/heroe.interface';
import { of } from 'rxjs';
import { HeroeService } from './heroe.service';

describe('HeroeStoreService', () => {
  let service: HeroeStoreService;
  let heroServiceMock: any;

  const heroesPrueba: HeroeI[] = [
    { id: 1, nombre: 'Batman' },
    { id: 2, nombre: 'Spiderman' },
  ];

  beforeEach(() => {
    heroServiceMock = {
      allHeroes: jasmine
        .createSpy('allHeroes')
        .and.returnValue(of(heroesPrueba)),
      addHeroe: jasmine
        .createSpy('addHeroe')
        .and.callFake((h: HeroeI) => of(h)),
      updateHeroe: jasmine
        .createSpy('updateHeroe')
        .and.callFake((h: HeroeI) => of(h)),
      deleteHeroe: jasmine.createSpy('deleteHeroe').and.returnValue(of(null)),
    };

    TestBed.configureTestingModule({
      providers: [
        HeroeStoreService,
        { provide: HeroeService, useValue: heroServiceMock },
      ],
    });

    service = TestBed.inject(HeroeStoreService);
    service['_heroes'].set([...heroesPrueba]);
  });

  it('Debe crearse store-service', () => {
    expect(service).toBeTruthy();
  });

  it('Debe agregar un heroe', fakeAsync(() => {
    const nuevo: HeroeI = { id: 3, nombre: 'Superman' };
    service.addHeroe(nuevo);
    tick();

    expect(heroServiceMock.addHeroe).toHaveBeenCalledWith(nuevo);
    expect(service['_heroes']()).toContain(nuevo);
    expect(service['_heroes']().length).toBe(3);
  }));

  it('Debe actualizar un heroe', fakeAsync(() => {
    const actualizado: HeroeI = { id: 1, nombre: 'Batman actualizado' };
    service.updateHeroe(actualizado);
    tick();

    expect(heroServiceMock.updateHeroe).toHaveBeenCalledWith(actualizado);
    expect(service['_heroes']().find((h) => h.id === 1)?.nombre).toBe(
      'Batman actualizado'
    );
  }));

  it('Debe eliminar un heroe', fakeAsync(() => {
    service.deleteHeroe(2);
    tick();

    expect(heroServiceMock.deleteHeroe).toHaveBeenCalledWith(2);
    expect(service['_heroes']().find((h) => h.id === 2)).toBeUndefined();
    expect(service['_heroes']().length).toBe(1);
  }));
});
