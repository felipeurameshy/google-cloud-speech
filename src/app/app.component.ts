import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
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
    public router: Router,
  ) { }


  navegar(caminho:any){
    this.router.navigate([caminho]);    
  }

}