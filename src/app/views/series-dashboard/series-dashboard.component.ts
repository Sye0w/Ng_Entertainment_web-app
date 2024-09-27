import { Component, OnInit } from '@angular/core';
import { MediaFacadeService } from '../../services/media-facade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-series-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series-dashboard.component.html',
  styleUrl: './series-dashboard.component.scss'
})

export class SeriesDashboardComponent implements OnInit {
  series$ = this.mediaFacade.getFilteredMedia('series')
  constructor(private mediaFacade: MediaFacadeService){}

  toggleBookmark(title: string) {
    if (title) {
      this.mediaFacade.toggleBookmark(title);
    } else {
      console.error(`Media with title "${title}" not found`);
    }
  }

  ngOnInit(): void {
    this.mediaFacade.loadMedias()
  }
}
