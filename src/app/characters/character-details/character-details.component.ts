import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { State } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { selectCharacter } from '../characters.selectors';
import { CharactersRequested } from '../characters.actions';
import { Subscription } from 'rxjs';
import { FilmsRequested } from '../../films/films.actions';
import { SpeciesRequested } from '../../species/species.actions';
import { StarshipsRequested } from '../../starships/starships.actions';

@Component({
    selector: 'app-character-details',
    templateUrl: './character-details.component.html',
    styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
    character;
    subsc: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private store: Store<State>) {
    }

    ngOnInit() {
        this.store.dispatch(new CharactersRequested());
        this.store.dispatch(new FilmsRequested());
        this.store.dispatch(new SpeciesRequested());
        this.store.dispatch(new StarshipsRequested());

        this.route.params.subscribe(params => {
            this.subsc = this.store.pipe(select(selectCharacter(params.id)))
                .subscribe(res => {
                    this.character = res;
                });
        });
    }

    goBack() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
    }
}
