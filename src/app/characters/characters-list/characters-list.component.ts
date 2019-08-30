import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Character } from '../models/character';
import { CharactersDataSource } from '../_services/characters.datasource';
import { State } from '../../reducers';
import { PageQuery } from '../characters.actions';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-characters-list',
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit, AfterViewInit {
    @Input() characters: Character[];
    dataSource: CharactersDataSource;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    pageSize = 3;

    constructor(private store: Store<State>) {
    }

    ngOnInit() {
        this.dataSource = new CharactersDataSource(this.store);
        const initialPage: PageQuery = {
            pageIndex: 0,
            pageSize: 3
        };
        this.dataSource.loadCharacters(initialPage);
    }

    ngAfterViewInit() {
        this.paginator.page
            .pipe(
                tap(() => this.loadCharactersPage())
            )
            .subscribe();
    }

    loadCharactersPage() {
        const newPage: PageQuery = {
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize
        };

        this.dataSource.loadCharacters(newPage);
    }
}
