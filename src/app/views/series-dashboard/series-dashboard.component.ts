import { Component } from '@angular/core';
import { MediaFacadeService } from '../../services/media-facade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-series-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series-dashboard.component.html',
  styleUrl: './series-dashboard.component.scss'
})

export class SeriesDashboardComponent {
  series$ = this.mediaFacade.series$
  constructor(private mediaFacade: MediaFacadeService){}
}
