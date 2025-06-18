import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioRecorderService } from './audio-recorder.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TextareaModule } from 'primeng/textarea';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-root',
  imports: [FormsModule, TextareaModule, FluidModule, InputTextModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'google-cloud-speech';

  recording = false;
  uploading = false;
  message = "";
  medicalComplaint = "";
  solution = "";

  constructor(
    private audioService: AudioRecorderService,
    private http: HttpClient
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