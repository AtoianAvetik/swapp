import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { selectFilms } from '../../films/films.selectors';
import { selectSpecies } from '../../species/species.selectors';
import { selectCharacters } from '../characters.selectors';
import { State } from '../../reducers';
import { CharactersFiltered, CharactersPageChanged } from '../characters.actions';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewInit {
    form: FormGroup;

    films$ = this.store.select(selectFilms);
    species$ = this.store.select(selectSpecies);
    characters$ = this.store.select(selectCharacters);

    minRange = 0;
    maxRange = 10;
    sliderConfig: any = {
        format: {
            from: (value) => {
                return parseInt(value, 10);
            },
            to: (value) => {
                return parseInt(value, 10) + 'BBY';
            }
        }
    };

    constructor(private $fb: FormBuilder,
                private store: Store<State>,
                private cdRef: ChangeDetectorRef) {
        this.initForm();
        this.updateFilter();
    }

    ngOnInit(): void {
        this.form.valueChanges.subscribe(res => this.updateFilter(res));
    }

    ngAfterViewInit(): void {
        this.characters$.pipe(
            map(res => res
                .map(c => parseInt(c['birthYear'], 10))
                .filter(v => !!v)
            ),
        )
            .subscribe(res => {
                this.maxRange = res.length ? Math.max.apply(this, res) : this.maxRange;
                this.form.controls['birthYear'].patchValue([0, this.maxRange]);
                this.cdRef.detectChanges();
                this.updateFilter();
            });
    }

    initForm() {
        this.form = this.$fb.group({
            films: [''],
            species: [''],
            birthYear: [[0, 0]],
        });
    }

    updateFilter(filter = this.form.value) {
        this.store.dispatch(new CharactersFiltered({filter}));
        // reset paginator
        this.store.dispatch(new CharactersPageChanged({pageIndex: 0}));
    }
}
