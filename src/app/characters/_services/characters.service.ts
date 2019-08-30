import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../../core/_services/api.service';
import { Character } from '../models/character';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';

@Injectable()
export class CharactersService {
    constructor(private $apiService: ApiService,
                private store: Store<State>) {

    }

    getAllCharacters(): Observable<Character[]> {
        return this.$apiService.get('people/')
            .pipe(
                map(res =>  res['results'].map((v, i) => new Character(v, i.toString()))),
            );
    }
}
