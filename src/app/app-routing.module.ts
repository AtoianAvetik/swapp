import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailsComponent } from './characters/character-details/character-details.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full'
    },
    {
        path: 'characters',
        component: CharactersComponent
    },
    {
        path: 'characters:id',
        component: CharacterDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
