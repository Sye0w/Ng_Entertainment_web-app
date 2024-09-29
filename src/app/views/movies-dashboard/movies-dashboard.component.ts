import { Component, OnInit } from '@angular/core';
import { MediaFacadeService } from '../../services/media-facade.service';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { MediaCardReusableComponent } from "../../components/media-card-reusable/media-card-reusable.component";

@Component({
  selector: 'app-movies-dashboard',
  standalone: true,
  imports: [CommonModule, NotFoundComponent, MediaCardReusableComponent],
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
