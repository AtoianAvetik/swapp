import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { expand, last, map, scan } from 'rxjs/operators';

import { ApiService } from '../../core/_services/api.service';
import { Character } from '../models/character';
import { State } from '../../reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class CharactersService {
    constructor(private $apiService: ApiService,
                private store: Store<State>) {

    }

    getAllCharacters(): Observable<any> {
        return this.$apiService.get('people/')
            .pipe(
                expand(res => res['next']
                    ? this.$apiService.get(res['next'], true)
                    : of()),
                map(res => res['results']),
                scan((acc, res) => acc.concat(res), []),
                last(),
                map(res => res.map((v, i) => new Character(v, i.toString(), this.store))),
            );
    }
}
