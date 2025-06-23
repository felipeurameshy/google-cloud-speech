import { Routes } from '@angular/router';
import { ComponentAudioBrowserComponent } from './component-audio-browser/component-audio-browser.component';
import { ComponentAudioChunkComponent } from './component-audio-chunk/component-audio-chunk.component';
import { ComponentAudioWavComponent } from './component-audio-wav/component-audio-wav.component';

export const routes: Routes = [

  {
    path: 'browser',
    component: ComponentAudioBrowserComponent
  },
  {
    path: 'chunk',
    component: ComponentAudioChunkComponent
  },
  {
    path: 'wav',
    component: ComponentAudioWavComponent
  },
];
