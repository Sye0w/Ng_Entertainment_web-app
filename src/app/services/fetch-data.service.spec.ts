import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FetchDataService } from './fetch-data.service';
import { IMediaItem } from '../store/media.interface';

describe('FetchDataService', () => {
  let service: FetchDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FetchDataService]
    });

    service = TestBed.inject(FetchDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from the correct URL', () => {
    const mockData: IMediaItem[] = [
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
      }
    ];

    service.fetchData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('../../assets/data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
