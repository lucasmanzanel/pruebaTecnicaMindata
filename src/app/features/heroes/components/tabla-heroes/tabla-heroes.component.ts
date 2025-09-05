import { Component, computed, inject, signal } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { catchError, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { HeroeI } from '../../interfaces/heroe.interface';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AgregarHeroeComponent } from '../agregar-heroe/agregar-heroe.component';
import { HeroeStoreService } from '../../services/heroe-store.service';
import Swal from 'sweetalert2';
import { BuscadorComponent } from '../buscador/buscador.component';

@Component({
  selector: 'app-tabla-heroes',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    BuscadorComponent
  ],
  templateUrl: './tabla-heroes.component.html',
  styleUrl: './tabla-heroes.component.scss',
  standalone: true,
})
export class TablaHeroesComponent {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  private heroService = inject(HeroeService);
  private dialog = inject(MatDialog);
  private store = inject(HeroeStoreService);

  query = signal('');
  pageIndex = signal(0);
  pageSize = signal(5);

  filtradoHeroes = computed(() =>
    this.store
      .heroes()
      .filter((h) =>
        h.nombre.toLowerCase().includes(this.query().toLowerCase())
      )
  );

  allHeroes = toSignal(
    this.heroService.allHeroes().pipe(catchError(() => of([] as HeroeI[]))),
    { initialValue: [] }
  );

  paginadoHeroes = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.filtradoHeroes().slice(start, end);
  });

  setQuery(query: string) {
    this.query.set(query);
    this.pageIndex.set(0);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  nuevoHeroe() {
    const dialogRef = this.dialog.open(AgregarHeroeComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: HeroeI | null) => {
      if (result) {
        this.store.addHeroe(result);
        Swal.fire(`Has agregado a ${result?.nombre}`, '', 'success');
      }
    });
  }

  editarHeroe(hero: HeroeI) {
    const dialogRef = this.dialog.open(AgregarHeroeComponent, {
      width: '400px',
      data: hero,
    });
    dialogRef.afterClosed().subscribe((result: HeroeI | null) => {
      if (result) this.store.updateHeroe(result);
    });
  }

  eliminarHeroe(hero: HeroeI) {
    Swal.fire({
      title: `¿Está seguro de eliminar a ${hero.nombre}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`Has eliminado a ${hero.nombre}`, '', 'success');
        this.store.deleteHeroe(hero.id);
      }
    });
  }

    onBuscar(texto: string) {
    this.query.set(texto);
    this.pageIndex.set(0);
  }
}
