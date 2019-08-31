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
    step = 1;
    sliderConfig: any = {
        behaviour: 'drag',
        connect: true,
        margin: 1,
        tooltips: true,
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
        this.updateFormValue();
    }

    ngOnInit(): void {
        this.form.get('species').valueChanges.subscribe(species => {
            this.updateFormValue(Object.assign({}, this.form.value, {species}));
        });
        //
        this.form.get('films').valueChanges.subscribe(films => {
            this.updateFormValue(Object.assign({}, this.form.value, {films}));
        });
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
                this.cdRef.detectChanges();
                this.form.controls['birthYear'].patchValue([0, this.maxRange]);
                this.updateFormValue();
            });
    }

    initForm() {
        this.form = this.$fb.group({
            films: [''],
            species: [''],
            birthYear: [[0, 0]],
        });
    }

    updateFormValue(filter = this.form.value) {
        this.store.dispatch(new CharactersFiltered({filter}));
        // reset paginator
        this.store.dispatch(new CharactersPageChanged({pageIndex: 0}));
    }
}
