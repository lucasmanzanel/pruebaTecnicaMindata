import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { TablaHeroesComponent } from './tabla-heroes.component';
import { HeroeStoreService } from '../../services/heroe-store.service';
import { HeroeService } from '../../services/heroe.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HeroeI } from '../../interfaces/heroe.interface';
import { signal } from '@angular/core';

describe('TablaHeroesComponent', () => {
  let component: TablaHeroesComponent;
  let fixture: ComponentFixture<TablaHeroesComponent>;
  let storeMock: any;
  let dialogMock: any;
  let heroServiceMock: any;

  const heroesPrueba: HeroeI[] = [
    { id: 1, nombre: 'Batman' },
    { id: 2, nombre: 'Spiderman' },
    { id: 3, nombre: 'Superman' },
  ];

  beforeEach(() => {
    storeMock = {
      heroes: () => signal(heroesPrueba)(),
      updateHeroe: jasmine.createSpy('updateHeroe'),
      deleteHeroe: jasmine.createSpy('deleteHeroe'),
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of({ id: 4, nombre: 'Ironman' }),
      }),
    };

    heroServiceMock = {
      allHeroes: jasmine
        .createSpy('allHeroes')
        .and.returnValue(of(heroesPrueba)),
    };

    TestBed.configureTestingModule({
      imports: [TablaHeroesComponent],
      providers: [
        { provide: HeroeStoreService, useValue: storeMock },
        { provide: HeroeService, useValue: heroServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    });

    fixture = TestBed.createComponent(TablaHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear tabla de heroes', () => {
    expect(component).toBeTruthy();
  });

  it('Debe editar un heroe', fakeAsync(() => {
    const heroe = heroesPrueba[0];
    component.editarHeroe(heroe);
    tick();
    expect(storeMock.updateHeroe).toHaveBeenCalledWith(
      jasmine.objectContaining({ nombre: 'Ironman' })
    );
  }));

    it('Debe filtrar heroes', () => {
    component.setQuery('man');
    const filtrados = component.filtradoHeroes();
    expect(filtrados.length).toBe(3);
    expect(filtrados.map(h => h.nombre)).toContain('Batman');
  });
  
});
