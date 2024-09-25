import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/auth/login/login.component";
import { MediaFacadeService } from './services/media-facade.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'Ng-Entertainment_web-app';

  constructor( private mediaFacade: MediaFacadeService){}

  ngOnInit(){
    this.mediaFacade.loadMedias()
  }

}
