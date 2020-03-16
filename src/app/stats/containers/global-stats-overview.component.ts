import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TitleActions } from '@covid19/core/+state/actions';
import {
  globalStatsActions,
  globalStatsHistoryActions
} from '@covid19/stats/+state/actions/';
import * as fromStats from '@covid19/stats/+state/reducer';
import { GlobalStats } from '@covid19/stats/models';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'covid-global-stats-overview',
  templateUrl: './global-stats-overview.component.html',
  styleUrls: ['./global-stats-overview.component.scss']
})
export class GlobalStatsOverviewComponent implements OnInit {
  globalStats$: Observable<GlobalStats>;
  globalStatsHistory$: Observable<GlobalStats[]>;
  loading$: Observable<boolean>;

  public loadGlobalStats = (): void => {
    this.store.dispatch(new TitleActions.SetTitle('Global'));
    this.store.dispatch(globalStatsActions.load());
  };

  public loadGlobalStatsHistory = (): void => {
    this.store.dispatch(new TitleActions.SetTitle('Global History'));
    this.store.dispatch(globalStatsHistoryActions.load());
  };

  tabLabelsFunc = [
    {
      label: 'Current',
      func: this.loadGlobalStats
    },
    {
      label: 'History',
      func: this.loadGlobalStatsHistory
    }
  ];

  public constructor(private readonly store: Store<fromStats.StatsState>) {}

  public ngOnInit(): void {
    this.globalStats$ = this.store.pipe(select(fromStats.getGlobalStats));
    this.globalStatsHistory$ = this.store.pipe(
      select(fromStats.getGlobalHistoryStats)
    );
    this.loading$ = combineLatest(
      this.store.pipe(select(fromStats.getGlobalStatsLoading)),
      this.store.pipe(select(fromStats.getGlobalHistoryStatsLoading))
    ).pipe(
      map(
        ([globalStatsLoading, globalStatsHistoryLoading]) =>
          globalStatsLoading || globalStatsHistoryLoading
      )
    );

    this.loadGlobalStats();
  }

  public tabChanged(chane: MatTabChangeEvent): void {
    this.tabLabelsFunc[chane.index].func();
  }
}