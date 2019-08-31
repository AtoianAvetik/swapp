import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { select, Store } from '@ngrx/store';

import { Character } from '../models/character';
import { CharactersDataSource } from '../_services/characters.datasource';
import { State } from '../../reducers';
import { CharactersPageChanged, PageQuery } from '../characters.actions';
import { tap } from 'rxjs/operators';
import { charactersPageIndex } from '../characters.selectors';

@Component({
    selector: 'app-characters-list',
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit, AfterViewInit {
    @Input() characters: Character[];
    dataSource: CharactersDataSource;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    pageSize = 10;
    pageIndex$ = this.store.pipe(select(charactersPageIndex));

    constructor(private store: Store<State>) {
    }

    ngOnInit() {
        this.dataSource = new CharactersDataSource(this.store);
        this.store.pipe(
            select(charactersPageIndex)
        ).subscribe(pageIndex => {
            const initialPage: PageQuery = {
                pageIndex,
                pageSize: this.pageSize
            };
            this.dataSource.loadCharacters(initialPage);
        });
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

        // store current page index
        this.store.dispatch(new CharactersPageChanged({pageIndex: newPage.pageIndex}));
    }
}
