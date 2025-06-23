import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TextareaModule } from 'primeng/textarea';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AudioChunkService } from '../audio-chunk.service';

@Component({
  selector: 'app-component-audio-chunk',
  imports: [FormsModule, TextareaModule, FluidModule, InputTextModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './component-audio-chunk.component.html',
  styleUrl: './component-audio-chunk.component.css'
})
export class ComponentAudioChunkComponent {

recording = false;
  uploading = false;
  message = "";
  medicalComplaint = "";
  solution = "";

  constructor(
    private audioService: AudioChunkService,
    public router: Router,
  ) { }

  navegar(caminho:any){
    this.router.navigate([caminho]);    
  }


  async start() {
    this.message = "";
    this.recording = true;
    this.audioService.startRecordingChunk();
  }

  async stop() {
    this.recording = false;
    this.audioService.stopRecordingChunk();
  }

}