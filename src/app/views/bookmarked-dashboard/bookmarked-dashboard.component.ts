import { Component, OnInit } from '@angular/core';
import { MediaFacadeService } from '../../services/media-facade.service';
import { map, Observable, tap } from 'rxjs';
import { IMediaItem } from '../../store/media.interface';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { MediaCardReusableComponent } from "../../components/media-card-reusable/media-card-reusable.component";

@Component({
  selector: 'app-bookmarked-dashboard',
  standalone: true,
  imports: [CommonModule, NotFoundComponent, MediaCardReusableComponent],
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
