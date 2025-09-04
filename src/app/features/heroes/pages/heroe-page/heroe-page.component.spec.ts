import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroePageComponent } from './heroe-page.component';
import { provideHttpClient } from '@angular/common/http';
import { HeroeStoreService } from '../../services/heroe-store.service';

describe('HeroePageComponent', () => {
  let component: HeroePageComponent;
  let fixture: ComponentFixture<HeroePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroePageComponent],
      providers: [provideHttpClient(), HeroeStoreService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crearse homepageComponent', () => {
    expect(component).toBeTruthy();
  });
});
