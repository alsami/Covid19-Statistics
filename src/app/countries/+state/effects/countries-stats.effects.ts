import { Injectable } from '@angular/core';
import { countriesStatsActions } from '@covid19/countries/+state/actions';
import { CountryStatsService } from '@covid19/countries/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CountriesStatsEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countriesStatsActions.load),
      mergeMap(() =>
        this.countryStatsService.load().pipe(
          map(stats =>
            countriesStatsActions.loaded({
              countryStats: stats
            })
          ),
          catchError(() => of(countriesStatsActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly countryStatsService: CountryStatsService
  ) {}
}