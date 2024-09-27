import { Component, OnInit } from '@angular/core';
import { MediaFacadeService } from '../../services/media-facade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies-dashboard.component.html',
  styleUrl: './movies-dashboard.component.scss'
})

export class MoviesDashboardComponent implements OnInit {
  movies$ = this.mediaFacade.getFilteredMedia('movies')
  constructor(private mediaFacade: MediaFacadeService ){}

  toggleBookmark(title: string) {
    if (title) {
      this.mediaFacade.toggleBookmark(title);
    } else {
      console.error(`Media with title "${title}" not found`);
    }
  }

  ngOnInit(){
    this.mediaFacade.loadMedias()
  }
}
