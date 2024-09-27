import { Component, OnInit } from '@angular/core';
import { MediaFacadeService } from '../../services/media-facade.service';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from "../../components/not-found/not-found.component";


@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, NotFoundComponent],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss'
})

export class HomeDashboardComponent implements OnInit {
  homeMedias$ = this.mediaFacade.getFilteredMedia('all');
  searchParam$ = this.mediaFacade.searchParam$;

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
