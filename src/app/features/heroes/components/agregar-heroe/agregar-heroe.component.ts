import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeroeI } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-agregar-heroe',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './agregar-heroe.component.html',
  styleUrl: './agregar-heroe.component.scss',
})
export class AgregarHeroeComponent {
  private dialogRef = inject(MatDialogRef<AgregarHeroeComponent>);
  private fb = inject(FormBuilder);

  data = inject(MAT_DIALOG_DATA) as HeroeI | undefined;

  form: FormGroup = this.fb.group({
    nombre: [this.data?.nombre || '', Validators.required],
  });

  guardar() {
    if (this.form.valid) {
      // id cualquiera, del 7 en adelante
      const idRandom = Math.floor(Math.random() * (100 - 7 + 1)) + 7;

      const heroe: HeroeI = {
        id: this.data?.id || idRandom,
        nombre: this.form.value.nombre.trim(),
      };
      this.dialogRef.close(heroe);
    }
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
