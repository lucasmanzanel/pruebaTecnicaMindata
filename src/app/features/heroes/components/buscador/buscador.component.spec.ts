import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorComponent } from './buscador.component';
import { By } from '@angular/platform-browser';

describe('BuscadorComponent', () => {
  let component: BuscadorComponent;
  let fixture: ComponentFixture<BuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('Debe emitir evento buscar cuando cambia el input', () => {
    spyOn(component.buscar, 'emit');
    const input = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    input.value = 'Superman';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.valor()).toBe('Superman');
    expect(component.buscar.emit).toHaveBeenCalledWith('Superman');
  });
});
