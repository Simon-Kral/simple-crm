import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserInfoComponent } from './dialog-edit-user-info.component';

describe('DialogEditUserInfoComponent', () => {
  let component: DialogEditUserInfoComponent;
  let fixture: ComponentFixture<DialogEditUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
