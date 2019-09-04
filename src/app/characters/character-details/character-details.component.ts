import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { State } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { selectCharacter } from '../characters.selectors';
import { Subscription } from 'rxjs';
import { appDataLoading } from '../../app.selectors';

@Component({
    selector: 'app-character-details',
    templateUrl: './character-details.component.html',
    styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
    character;
    subscriptions: Subscription[] = [];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private store: Store<State>) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.subscriptions.push(this.store.pipe(select(selectCharacter(params.id)))
                .subscribe(res => {
                    this.character = res;
                }));
            this.subscriptions.push(this.store.pipe(select(appDataLoading))
                .subscribe(res => {
                    if ( !res && !this.character ) { // if loading finished and character not founded then go to list
                        this.goBack();
                    }
                }));
        });
    }

    goBack() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
