import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSpecies from '../species/species.reducers';
import { EffectsModule } from '@ngrx/effects';
import { SpeciesEffects } from './species.effects';
import { SpeciesService } from './_services/species.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(fromSpecies.speciesFeatureKey, fromSpecies.speciesReducers),
        EffectsModule.forFeature([SpeciesEffects]),
    ],
    providers: [
        SpeciesService,
    ],
})
export class SpeciesModule {
}
