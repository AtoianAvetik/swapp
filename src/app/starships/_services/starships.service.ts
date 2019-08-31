import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { expand, last, map, scan } from 'rxjs/operators';

import { ApiService } from '../../core/_services/api.service';
import { Starship } from '../models/starship';

@Injectable()
export class StarshipsService {
    constructor(private $apiService: ApiService) {

    }

    getAllStarships(): Observable<Starship[]> {
        return this.$apiService.get('starships/')
            .pipe(
                expand(res => res['next']
                    ? this.$apiService.get(res['next'], true)
                    : of()),
                map(res => res['results']),
                scan((acc, res) => acc.concat(res), []),
                last(),
                map(res => res.map((v, i) => new Starship(v, i.toString()))),
            );
    }
}
