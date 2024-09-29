import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMediaItem } from '../../store/media.interface';
import { MediaFacadeService } from '../../services/media-facade.service';


@Component({
  selector: 'app-media-card-reusable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-card-reusable.component.html',
  styleUrls: ['./media-card-reusable.component.scss']
})
export class MediaCardReusableComponent {
  @Input() media!: IMediaItem;

  constructor(private mediaFacade: MediaFacadeService){}

  toggleBookmark(title: string) {
    if (title) {
      this.mediaFacade.toggleBookmark(title);
    } else {
      console.error(`Media with title "${title}" not found`);
    }
  }

}
