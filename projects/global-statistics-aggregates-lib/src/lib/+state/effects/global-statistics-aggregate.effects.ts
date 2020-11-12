import { Injectable } from '@angular/core';
import { GlobalStatisticsAggregatesActions } from '@covid19-global-statistics-aggregates-lib/lib/+state/actions';
import { GlobalStatisticsAggregatesService } from '@covid19-global-statistics-aggregates-lib/lib/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class GlobalStatisticsAggregatesEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalStatisticsAggregatesActions.loadForYear),
      mergeMap((action) =>
        this.globalStatsService.loadForYear(action.year).pipe(
          map((aggregates) =>
            GlobalStatisticsAggregatesActions.loadedForYear({
              aggregates: aggregates,
            })
          ),
          catchError(() =>
            of(GlobalStatisticsAggregatesActions.loadForYearFailed())
          )
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly globalStatsService: GlobalStatisticsAggregatesService
  ) {}
}
