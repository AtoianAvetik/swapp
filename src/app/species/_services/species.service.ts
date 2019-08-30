import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { expand, map, scan } from 'rxjs/operators';

import { ApiService } from '../../core/_services/api.service';
import { Species } from '../models/species';

@Injectable()
export class SpeciesService {
    constructor(private $apiService: ApiService) {

    }

    getAllSpecies(): Observable<Species[]> {
        return this.$apiService.get('species/')
            .pipe(
                expand(res => res['next']
                    ? this.$apiService.get(res['next'], true)
                    : of()),
                map(res => res['results']),
                scan((acc, res) => acc.concat(res), []),
                map(res => res.map((v, i) => new Species(v, i.toString()))),
            );
    }
}
