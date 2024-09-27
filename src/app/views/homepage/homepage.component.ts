import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { RouterModule } from '@angular/router';
import { MediaFacadeService } from '../../services/media-facade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, SearchComponent,RouterModule,CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent {
  homeMedias$ = this.mediaFacade.getFilteredMedia('all');
  searchParam$ = this.mediaFacade.searchParam$;

  constructor(private mediaFacade: MediaFacadeService){}

}
