import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedidaComponent } from './edit-medida.component';

describe('EditMedidaComponent', () => {
  let component: EditMedidaComponent;
  let fixture: ComponentFixture<EditMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
