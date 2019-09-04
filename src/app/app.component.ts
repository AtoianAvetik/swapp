import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgtLoaderService } from 'ng-tools';
import { select, Store } from '@ngrx/store';
import { State } from './reducers';
import { DataService } from './core/_services/data.service';
import { appDataLoading } from './app.selectors';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'SWAPP';
    loader;

    constructor(private $loaderService: NgtLoaderService,
                private $dataService: DataService,
                private store: Store<State>) {
    }

    ngOnInit(): void {
        this.$dataService.requestAllData();
    }

    ngAfterViewInit(): void {
        this.loader = this.$loaderService.create({
            id: 'appLoader'
        });

        this.store.pipe(select(appDataLoading))
            .subscribe(res => {
                res ? this.loader.present() : this.loader.dismiss();
            });
    }
}
