import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioChunkService {

    private mediaRecorder!: MediaRecorder;


    constructor(public http: HttpClient) {
    }

    async startRecordingChunk() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
        });

        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                this.sendChunk(event.data);
            }
        };

        this.mediaRecorder.start(1000); // grava chunks de 1 segundo
    }

    stopRecordingChunk() {
        if (this.mediaRecorder?.state !== 'inactive') {
        this.mediaRecorder.stop();
        }
    }

    private sendChunk(blob: Blob) {
        const formData = new FormData();
        const file = new File([blob], 'audio_chunk.webm', { type: 'audio/webm' });
        formData.append('file', file);

        this.http.post('http://localhost:8080/api/speech/transcribe/chunk', formData).subscribe({
            next: () => console.log('Chunk enviado'),
            error: (err) => console.error('Erro ao enviar chunk:', err)
        });
  }

}
