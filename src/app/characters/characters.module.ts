import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatPaginatorModule } from '@angular/material';
import { CharactersComponent } from './characters.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersRoutingModule } from './characters-routing.module';

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
    ]
})
export class CharactersModule {
}
