import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyRoomComponent } from './lobby-room.component';

describe('LobbyRoomComponent', () => {
  let component: LobbyRoomComponent;
  let fixture: ComponentFixture<LobbyRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LobbyRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LobbyRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
