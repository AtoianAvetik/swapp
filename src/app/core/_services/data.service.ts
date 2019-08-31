import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { expand, last, map, scan } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private $apiService: ApiService,) {
    }

    fetchPaginatedData(path): Observable<any> {
        return this.$apiService.get(path)
            .pipe(
                expand(res => res['next']
                    ? this.$apiService.get(res['next'], true)
                    : of()),
                map(res => res['results']),
                scan((acc, res) => acc.concat(res), []),
                last()
            );
    }
}
