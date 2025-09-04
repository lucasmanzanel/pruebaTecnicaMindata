import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHeroeComponent } from './agregar-heroe.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AgregarHeroeComponent', () => {
  let component: AgregarHeroeComponent;
  let fixture: ComponentFixture<AgregarHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarHeroeComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1, nombre: 'Batman' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crearse componente de agregar heroe', () => {
    expect(component).toBeTruthy();
  });

  it('Se debe inicializar formulario con data a editar', () => {
    expect(component.form.value.nombre).toBe('Batman');
  });
});
