import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { State } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { Character } from '../models/character';
import { PageQuery } from '../characters.actions';
import { selectCharactersPage } from '../characters.selectors';

export class CharactersDataSource implements DataSource<Character> {
    private charactersSubject = new BehaviorSubject<Character[]>([]);

    constructor(private store: Store<State>) {

    }

    loadCharacters(page: PageQuery) {
        this.store
            .pipe(
                select(selectCharactersPage(page)),
                tap(characters => this.charactersSubject.next(characters)),
                catchError(() => of([]))
            )
            .subscribe();

    }

    connect(collectionViewer: CollectionViewer): Observable<Character[]> {
        console.log('Connecting data source');
        return this.charactersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.charactersSubject.complete();
    }
}

