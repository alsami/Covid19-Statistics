import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as fromRoot from '@covid19/+state';
import {
  countriesOfInterestActions,
  TitleActions
} from '@covid19/core/+state/actions';
import { countriesStatsActions } from '@covid19/countries/+state/actions';
import * as fromCountries from '@covid19/countries/+state/reducer';
import { CountriesAutoCompleteComponent } from '@covid19/countries/components';
import { CountryStats } from '@covid19/countries/models';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'covid19-countries-stats-overview',
  templateUrl: './countries-stats-overview.component.html',
  styleUrls: ['./countries-stats-overview.component.scss']
})
export class CountriesStatsOverviewComponent implements OnInit, AfterViewInit {
  public loading$: Observable<boolean>;
  public countryStats$: Observable<CountryStats[]>;
  public filteredCountryStats$: Observable<CountryStats[]>;
  public countriesOfInterest$: Observable<string[]>;

  @ViewChild('countryAutoComplete', { static: false })
  countryAutoComplete: CountriesAutoCompleteComponent;

  public tabLabelsFunc = [
    {
      label: 'Overview',
      func: console.log
    },
    {
      label: 'Graph',
      func: console.log
    }
  ];

  public constructor(private store: Store<fromCountries.CountryState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new TitleActions.SetTitle('Countries'));

    this.loading$ = this.store.pipe(
      select(fromCountries.getCountriesStatsLoading)
    );

    this.countryStats$ = this.store.pipe(
      select(fromCountries.getCountriesStats)
    );

    this.countriesOfInterest$ = this.store.pipe(
      select(fromRoot.getCountriesOfInterest)
    );
  }

  public ngAfterViewInit(): void {
    this.subscribeFilterCountryStatsChanges();
  }

  public animationDone(index: number) {
    if (index !== 0) {
      return;
    }

    this.store.dispatch(countriesStatsActions.load());
  }

  public storeCountryOfInterest(country: string): void {
    this.store.dispatch(
      countriesOfInterestActions.store({
        countryOfInterest: country
      })
    );
  }

  public removeCountryOfInterest(country: string): void {
    this.store.dispatch(
      countriesOfInterestActions.remove({
        countryOfInterest: country
      })
    );
  }

  public trackCountryStatsChanges(countryStat: CountryStats): string {
    return `${countryStat.country}_${countryStat.fetchedAt}`;
  }

  private subscribeFilterCountryStatsChanges(): void {
    this.filteredCountryStats$ = combineLatest(
      this.countryAutoComplete.countriesSelected.asObservable(),
      this.countryStats$
    ).pipe(
      map(([selectedCountries, countryStats]) => {
        if (!selectedCountries || !selectedCountries.length) {
          return countryStats;
        }

        return countryStats.filter(
          s => selectedCountries.indexOf(s.country) > -1
        );
      })
    );
  }
}
