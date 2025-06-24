import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TextareaModule } from 'primeng/textarea';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AudioBrowserService } from '../audio-browser.service';

@Component({
  selector: 'app-component-audio-browser',
  imports: [FormsModule, TextareaModule, FluidModule, InputTextModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './component-audio-browser.component.html',
  styleUrl: './component-audio-browser.component.css'
})
export class ComponentAudioBrowserComponent {

  recording = false;
  uploading = false;
  message = "";
  medicalComplaint = "";
  solution = "";

  constructor(
    private audioService: AudioBrowserService,
    public router: Router,
  ) { }

async start() {
    this.message = "";
    this.recording = true;
    await this.audioService.startRecording();
  }

  async stop() {
    this.recording = false;
    const blob = await this.audioService.stopRecording();
    this.upload(blob);
  }

  upload(blob: Blob) {
    this.uploading = true;
    const formData = new FormData();
    formData.append('file', blob, 'audio.wav');

    this.audioService.upload(blob)
      .then(res => {
        this.uploading = false;
        this.message = res.message;
        this.medicalComplaint = res.medicalComplaint;
        this.solution = res.solution;
      })
      .catch(err => {
        this.uploading = false;
        console.error('Upload error', err);
      });
  }



}
