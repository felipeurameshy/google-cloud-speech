import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAudioBrowserComponent } from './component-audio-browser.component';

describe('ComponentAudioBrowserComponent', () => {
  let component: ComponentAudioBrowserComponent;
  let fixture: ComponentFixture<ComponentAudioBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentAudioBrowserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentAudioBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
