import { Component } from '@angular/core';
import { MediaFacadeService } from '../../services/media-facade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss'
})

export class HomeDashboardComponent {
  homeMedias$ = this.mediaFacade.mediasAll$
  trends$ = this.mediaFacade.trending$


  constructor(private mediaFacade: MediaFacadeService){
  }


}
