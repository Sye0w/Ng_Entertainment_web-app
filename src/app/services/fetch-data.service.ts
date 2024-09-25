import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMediaItem } from '../store/media.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})


export class FetchDataService {
  private apiUrl: string = '../../assets/data.json';

  constructor(private http: HttpClient) { }

  fetchData(): Observable<IMediaItem[]>{
    return this.http.get<IMediaItem[]>(this.apiUrl);
  }
}
