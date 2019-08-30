import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatPaginatorModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CharactersComponent } from './characters.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersRoutingModule } from './characters-routing.module';
import * as fromCharacters from './characters.reducers';
import { CharactersEffects } from './characters.effects';
import { CharactersService } from './_services/characters.service';

@NgModule({
    declarations: [
        CharactersComponent,
        CharacterDetailsComponent,
        CharactersListComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatPaginatorModule,
        CharactersRoutingModule,
        StoreModule.forFeature(fromCharacters.charactersFeatureKey, fromCharacters.charactersReducers),
        EffectsModule.forFeature([CharactersEffects]),
    ],
    providers: [
        CharactersService,
    ]
})
export class CharactersModule {
}
