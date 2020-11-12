import { GlobalStatisticsAggregate } from '@covid19-global-statistics-aggregates-lib/lib/models';
import { createAction, props } from '@ngrx/store';

enum GlobalStatisticsAggregateActions {
  LoadForYear = '[Global-Statistics-Aggregate] Load for year',
  LoadedForYear = '[Global-Statistics-Aggregate] Loaded for year',
  LoadForYearFailed = '[Global-Statistics-Aggregate] Load for year failed',
}

export const loadForYear = createAction(
  GlobalStatisticsAggregateActions.LoadForYear,
  props<{ year: number }>()
);

export const loadedForYear = createAction(
  GlobalStatisticsAggregateActions.LoadedForYear,
  props<{ aggregates: GlobalStatisticsAggregate[] }>()
);
export const loadForYearFailed = createAction(
  GlobalStatisticsAggregateActions.LoadForYearFailed
);
