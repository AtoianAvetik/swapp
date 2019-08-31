import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatPaginatorModule, MatSelectModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import { CharactersComponent } from './characters.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import * as fromCharacters from './characters.reducers';
import { CharactersEffects } from './characters.effects';
import { CharactersService } from './_services/characters.service';
import { CharactersRoutingModule } from './characters-routing.module';
import { NgtModule } from 'ng-tools';
import { ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { FilterComponent } from './filter/filter.component';

@NgModule({
    declarations: [
        CharactersComponent,
        CharacterDetailsComponent,
        CharactersListComponent,
        FilterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        CharactersRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatPaginatorModule,
        NgtModule,
        ReactiveFormsModule,
        MatSelectModule,
        NouisliderModule,
        StoreModule.forFeature(fromCharacters.charactersFeatureKey, fromCharacters.charactersReducers),
        EffectsModule.forFeature([CharactersEffects]),
    ],
    providers: [
        CharactersService,
    ],
    exports: [
        FilterComponent,
    ]
})
export class CharactersModule {
}
