import { AsyncPipe, CommonModule } from '@angular/common';
import { Component,ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MediaFacadeService } from '../../services/media-facade.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavbarComponent {
  isHomeActive$ = this.mediaFacade.isRouteActive('/app/home')
  isMovieActive$ = this.mediaFacade.isRouteActive('/app/movies')
  isSeriesActive$ = this.mediaFacade.isRouteActive('/app/tv-series')
  isBookmarksActive$ = this.mediaFacade.isRouteActive('/app/bookmarks')

  constructor(private mediaFacade: MediaFacadeService){}
}
