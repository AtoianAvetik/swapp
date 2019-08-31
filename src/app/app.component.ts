import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgtLoaderService } from 'ng-tools';
import { select, Store } from '@ngrx/store';
import { State } from './reducers';
import { charactersLoading } from './characters/characters.selectors';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'SWAPP';
    loader;

    constructor(private $loaderService: NgtLoaderService,
                private store: Store<State>) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.loader = this.$loaderService.create({
            id: 'appLoader'
        });

        this.store.pipe(select(charactersLoading))
            .subscribe(res => {
                res ? this.loader.present() : this.loader.dismiss();
            });
    }
}
