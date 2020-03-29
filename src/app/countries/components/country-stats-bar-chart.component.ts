import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PROPER_GREEN, PROPER_RED } from '@covid19/core/core.constants';
import { CountryStats } from '@covid19/countries/models';
import { RegularChartData } from '@covid19/shared/models';

@Component({
  selector: 'covid19-country-stats-bar-chart',
  templateUrl: './country-stats-bar-chart.component.html',
  styleUrls: ['./country-stats-bar-chart.component.scss']
})
export class CountryStatsBarChartComponent implements OnChanges {
  @Input() countryStats: CountryStats;
  data: RegularChartData[] = [];

  /* 
  active cases, 
  deaths, 
  recovered, 
  */
  public colorScheme = {
    domain: ['#0000ff', PROPER_RED, PROPER_GREEN]
  };

  public xAxisLabel = 'Active, Deaths, Recovered';
  public yAxisLabel = 'Amount';

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.countryStats) {
      return;
    }

    if (
      changes.countryStats.previousValue &&
      changes.countryStats.previousValue === changes.countryStats.currentValue
    ) {
      return;
    }

    this.data = [];

    this.data.push({
      name: 'Active',
      value: this.countryStats.activeCases
    });

    this.data.push({
      name: 'Deaths',
      value: this.countryStats.totalDeaths
    });
    this.data.push({
      name: 'Recovered',
      value: this.countryStats.recoveredCases
    });
  }
}