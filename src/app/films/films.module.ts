import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromFilms from '../films/films.reducers';
import { EffectsModule } from '@ngrx/effects';
import { FilmsEffects } from './films.effects';
import { FilmsService } from './_services/films.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(fromFilms.filmsFeatureKey, fromFilms.filmsReducers),
        EffectsModule.forFeature([FilmsEffects]),
    ],
    providers: [
        FilmsService,
    ],
})
export class FilmsModule {
}
