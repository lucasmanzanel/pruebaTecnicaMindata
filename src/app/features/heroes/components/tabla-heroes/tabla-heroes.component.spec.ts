import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHeroesComponent } from './tabla-heroes.component';

describe('TablaHeroesComponent', () => {
  let component: TablaHeroesComponent;
  let fixture: ComponentFixture<TablaHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaHeroesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
