import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioRecorderService } from './audio-recorder.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'google-cloud-speech';

  recording = false;
  uploading = false;
  message = "";

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

  /*
  upload(blob: Blob) {
    this.uploading = true;
    const formData = new FormData();
    formData.append('file', blob, 'audio.wav');

    this.http.post('http://localhost:8080/api/speech/transcribe', formData)
      .subscribe({
        next: (res) => {
          this.uploading = false;
          console.log('Upload success', res);
        },
        error: (err) => {
          this.uploading = false;
          console.error('Upload error', err);
        }
      });
  }*/

  upload(blob: Blob) {
    this.uploading = true;
    const formData = new FormData();
    formData.append('file', blob, 'audio.wav');

    this.audioService.upload(blob)
      .then(res => {
        this.uploading = false;
        this.message = res.message;
      })
      .catch(err => {
        this.uploading = false;
        console.error('Upload error', err);
      });
  }


}