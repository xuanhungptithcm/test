import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerMusicComponent } from './manager-music.component';

describe('ManagerMusicComponent', () => {
  let component: ManagerMusicComponent;
  let fixture: ComponentFixture<ManagerMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
