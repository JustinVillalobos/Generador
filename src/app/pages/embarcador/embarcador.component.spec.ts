import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarcadorComponent } from './embarcador.component';

describe('EmbarcadorComponent', () => {
  let component: EmbarcadorComponent;
  let fixture: ComponentFixture<EmbarcadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbarcadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbarcadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
