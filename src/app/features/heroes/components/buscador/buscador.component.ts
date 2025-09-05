import { Component, input, output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscador',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss',
})
export class BuscadorComponent {

  valorInicial = input<string>('');
  placeholder = input<string>('Buscar...');
  valor = signal(this.valorInicial());
  buscar = output<string>();
  
  onInput(value: string) {
    this.valor.set(value);
    this.buscar.emit(value);
  }
}
