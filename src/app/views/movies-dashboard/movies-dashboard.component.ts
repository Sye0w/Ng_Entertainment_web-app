import { Component } from '@angular/core';
import { MediaFacadeService } from '../../services/media-facade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies-dashboard.component.html',
  styleUrl: './movies-dashboard.component.scss'
})

export class MoviesDashboardComponent {
  movies$ = this.mediaFacade.getFilteredMedia('movies')
  constructor(private mediaFacade: MediaFacadeService ){}
}
