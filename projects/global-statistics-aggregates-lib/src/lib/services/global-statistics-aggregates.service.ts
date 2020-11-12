import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalStatisticsAggregate } from '@covid19-global-statistics-aggregates-lib/lib/models';
import { GlobalStatistics } from '@covid19-global-statistics-lib/lib/models';
import { environment } from '@covid19-statistics-environment/environment';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalStatisticsAggregatesService {
  private readonly baseUrl = `${environment.apiUrl}global/aggregates`;

  public constructor(private readonly http: HttpClient) {}

  public loadForYear(year: number): Observable<GlobalStatisticsAggregate[]> {
    return this.http.get<GlobalStatistics[]>(`${this.baseUrl}/${year}`);
  }
}
