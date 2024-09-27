import { Component, OnInit } from '@angular/core';
import { MediaFacadeService } from '../../services/media-facade.service';
import { map, Observable, tap } from 'rxjs';
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
  bookmarks$: Observable<IMediaItem[]> = this.mediaFacade.getFilteredMedia('bookmarks');
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
    this.mediaFacade.loadMedias()
  }

  toggleBookmark(title: string) {
    if (title) {
      this.mediaFacade.toggleBookmark(title);
    } else {
      console.error(`Media with title "${title}" not found`);
    }
  }

}
