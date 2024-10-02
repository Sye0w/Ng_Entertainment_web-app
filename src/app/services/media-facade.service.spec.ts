import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MediaFacadeService } from './media-facade.service';
import { MediaActions } from '../store/media/media.actions';
import { IMediaItem } from '../store/media.interface';

describe('MediaFacadeService', () => {
  let service: MediaFacadeService;
  let mockStore: jest.Mocked<Store>;

  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn(),
      pipe: jest.fn(),
      select: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      providers: [
        MediaFacadeService,
        { provide: Store, useValue: mockStore }
      ]
    });

    service = TestBed.inject(MediaFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch loadMedias action', () => {
    service.loadMedias();
    expect(mockStore.dispatch).toHaveBeenCalledWith(MediaActions.loadMedias());
  });

  it('should dispatch toggleBookmark action', () => {
    const title = 'Test Title';
    service.toggleBookmark(title);
    expect(mockStore.dispatch).toHaveBeenCalledWith(MediaActions.toggleBookmark({ id: title }));
  });

  it('should filter media based on search term', (done) => {
    const mockMedia: IMediaItem[] = [
      {
        title: 'Test Movie', category: 'Movie',
        thumbnail: {
          trending: undefined,
          regular: {
            small: '',
            medium: '',
            large: ''
          }
        },
        year: 0,
        rating: 'E',
        isBookmarked: false,
        isTrending: false
      },
      {
        title: 'Another Movie', category: 'Movie',
        thumbnail: {
          trending: undefined,
          regular: {
            small: '',
            medium: '',
            large: ''
          }
        },
        year: 0,
        rating: 'E',
        isBookmarked: false,
        isTrending: false
      }
    ];
    mockStore.select.mockReturnValue(of(mockMedia));
    mockStore.pipe.mockReturnValue(of({ search: 'test' }));

    service.getFilteredMedia('all').subscribe(result => {
      expect(result).toEqual([mockMedia[0]]);
      done();
    });
  });

  it('should check if route is active', (done) => {
    mockStore.pipe.mockReturnValue(of('/home'));

    service.isRouteActive('/home').subscribe(result => {
      expect(result).toBeTruthy();
      done();
    });
  });
});
