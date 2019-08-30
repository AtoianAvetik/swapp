import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { FormBuilder } from '@angular/forms';
import { selectFilterState } from './filter.selectors';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    form$ = this.store.select(selectFilterState);
    form = this.$fb.group({
        name: ['']
    });
    constructor(private $fb: FormBuilder, private store: Store<State>) {}


    ngOnInit(): void {
    }
}
