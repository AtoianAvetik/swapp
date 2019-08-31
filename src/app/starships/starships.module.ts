import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromStarships from '../starships/starships.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StarshipsEffects } from './starships.effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(fromStarships.starshipsFeatureKey, fromStarships.starshipsReducers),
        EffectsModule.forFeature([StarshipsEffects]),
    ],
})
export class StarshipsModule {
}
