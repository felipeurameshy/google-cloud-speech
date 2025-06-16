import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import RecordRTC, { StereoAudioRecorder } from 'recordrtc';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AudioRecorderService {

    private stream: MediaStream | null = null;
    private recorder: RecordRTC | null = null;
    private audioBlob: Blob | null = null;


    constructor(public http: HttpClient) {
    }

    async startRecording(): Promise<void> {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.recorder = new RecordRTC(this.stream, {
            type: 'audio',
            mimeType: 'audio/wav',
            recorderType: StereoAudioRecorder,
            desiredSampRate: 16000,
            numberOfAudioChannels: 1,
        });
        this.recorder.startRecording();
    }

    async stopRecording(): Promise<Blob> {
        return new Promise((resolve) => {
            if (!this.recorder) return;
            this.recorder.stopRecording(() => {
                this.audioBlob = this.recorder!.getBlob();
                this.stream?.getTracks().forEach((t) => t.stop());
                resolve(this.audioBlob!);
            });
        });
    }

    getAudioBlob(): Blob | null {
        return this.audioBlob;
    }

    upload(blob: Blob) {
        const formData = new FormData();
        formData.append('file', blob, 'audio.wav');

        return firstValueFrom(this.http.post<any>('http://localhost:8080/api/speech/transcribe', formData))
            .then((response: any) => {
                return response;
            });
    }

}
