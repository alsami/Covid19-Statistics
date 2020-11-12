import { NgModule } from '@angular/core';
import { GlobalStatisticsAggregatesService } from '@covid19-global-statistics-aggregates-lib/lib/services';

@NgModule({
  providers: [GlobalStatisticsAggregatesService],
})
export class GlobalStatisticsAggregateLibModule {}
