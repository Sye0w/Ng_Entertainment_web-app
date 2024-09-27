import { Component, OnInit } from '@angular/core';
import { MediaFacadeService } from '../../services/media-facade.service';
import { map, Observable } from 'rxjs';
import { IMediaItem } from '../../store/media.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmarked-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmarked-dashboard.component.html',
  styleUrl: './bookmarked-dashboard.component.scss'
})

export class BookmarkedDashboardComponent implements OnInit {
  bookmarks$: Observable<IMediaItem[]> = this.mediaFacade.bookmarks$
  bookmarkedMovies$!: Observable<IMediaItem[]>;
  bookmarkedSeries$!: Observable<IMediaItem[]>;
  
  constructor(private mediaFacade: MediaFacadeService){}

  ngOnInit(){
    this.bookmarkedMovies$ = this.bookmarks$.pipe(
      map((bookmarks: IMediaItem[]) => bookmarks.filter((item) => item.category === 'Movie'))
    );

    this.bookmarkedSeries$ = this.bookmarks$.pipe(
      map((bookmarks: IMediaItem[]) => bookmarks.filter((item) => item.category === 'TV Series'))
    );
  }
}
