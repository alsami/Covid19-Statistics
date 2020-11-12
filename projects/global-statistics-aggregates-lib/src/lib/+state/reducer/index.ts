import * as fromRoot from '@covid19-statistics/+state';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromGlobalStatisticsAggregates from './global-statistics-aggregates.reducer';

export interface GlobalStatisticsAggregatesState {
  globalStatisticsAggregates: fromGlobalStatisticsAggregates.GlobalStatisticsAggregatesState;
}

export interface State extends fromRoot.AppState {
  globalStatisticsAggregates: GlobalStatisticsAggregatesState;
}

export const reducers: ActionReducerMap<GlobalStatisticsAggregatesState> = {
  globalStatisticsAggregates: fromGlobalStatisticsAggregates.reducer,
};

export const GLOBAL_STATISTICS_AGGREGATES_FEATURE_SELECTOR =
  'globalStatisticsAggregates';

export const getStatsState = createFeatureSelector<
  GlobalStatisticsAggregatesState
>(GLOBAL_STATISTICS_AGGREGATES_FEATURE_SELECTOR);

/**
 * Global stats
 */
export const getGlobalStatisticsAggregatesState = createSelector(
  getStatsState,
  (state) => state.globalStatisticsAggregates
);

export const getGlobalStatisticsAggregates = createSelector(
  getGlobalStatisticsAggregatesState,
  fromGlobalStatisticsAggregates.aggregates
);

export const getGlobalStatisticsAggregatesLoading = createSelector(
  getGlobalStatisticsAggregatesState,
  fromGlobalStatisticsAggregates.loading
);
