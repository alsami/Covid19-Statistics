import { GlobalStatisticsAggregatesActions } from '@covid19-global-statistics-aggregates-lib/lib/+state/actions';
import { GlobalStatisticsAggregate } from '@covid19-global-statistics-aggregates-lib/lib/models';
import { createReducer, on } from '@ngrx/store';

export interface GlobalStatisticsAggregatesState {
  loading: boolean;
  aggregates: GlobalStatisticsAggregate[];
}

const initialState: GlobalStatisticsAggregatesState = {
  loading: false,
  aggregates: null,
};

const _reducer = createReducer(
  initialState,
  on(GlobalStatisticsAggregatesActions.loadForYear, (state) => ({
    ...state,
    loading: true,
  })),
  on(GlobalStatisticsAggregatesActions.loadedForYear, (_, { aggregates }) => ({
    loading: false,
    aggregates: aggregates,
  })),
  on(GlobalStatisticsAggregatesActions.loadForYearFailed, (_) => initialState)
);

export function reducer(state: GlobalStatisticsAggregatesState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: GlobalStatisticsAggregatesState) =>
  state.loading;
export const aggregates = (state: GlobalStatisticsAggregatesState) =>
  state.aggregates;
