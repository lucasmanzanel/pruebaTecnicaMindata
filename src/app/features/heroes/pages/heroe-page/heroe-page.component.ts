import { Component } from '@angular/core';
import { TablaHeroesComponent } from "../../components/tabla-heroes/tabla-heroes.component";

@Component({
  selector: 'app-heroe-page',
  imports: [TablaHeroesComponent],
  templateUrl: './heroe-page.component.html',
  styleUrl: './heroe-page.component.scss',
  standalone: true
})
export class HeroePageComponent {

}
