import { Component, OnInit } from '@angular/core';
import { MediaFacadeService } from '../../services/media-facade.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IMediaItem } from '../../store/media.interface';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss'
})

export class HomeDashboardComponent implements OnInit {
  homeMedias$ = this.mediaFacade.getFilteredMedia('all')

  toggleBookmark(title: string) {
    if (title) {
      this.mediaFacade.toggleBookmark(title);
    } else {
      console.error(`Media with title "${title}" not found`);
    }
  }

  constructor(private mediaFacade: MediaFacadeService){
  }

  ngOnInit(){
    this.mediaFacade.loadMedias()
  }
}
