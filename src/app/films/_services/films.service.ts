import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { expand, last, map, scan } from 'rxjs/operators';

import { ApiService } from '../../core/_services/api.service';
import { Film } from '../models/film';

@Injectable()
export class FilmsService {
    constructor(private $apiService: ApiService) {

    }

    getAllFilms(): Observable<Film[]> {
        return this.$apiService.get('films/')
            .pipe(
                expand(res => res['next']
                    ? this.$apiService.get(res['next'], true)
                    : of()),
                map(res => res['results']),
                scan((acc, res) => acc.concat(res), []),
                last(),
                map(res => res.map((v, i) => new Film(v, i.toString()))),
            );
    }
}
