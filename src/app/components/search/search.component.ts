import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  private searchTerms = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.setupSearch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput() {
    this.searchTerms.next(this.searchTerm);
  }

  private setupSearch() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      this.router.navigate([], {
        queryParams: { search: term || null },
        queryParamsHandling: 'merge'
      });
    });
  }
}
