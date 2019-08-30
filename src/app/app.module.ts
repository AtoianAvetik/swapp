import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { FilterModule } from './filter/filter.module';
import { CharactersModule } from './characters/characters.module';
import { StarshipsModule } from './starships/starships.module';
import { FilmsModule } from './films/films.module';
import { SpeciesModule } from './species/species.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        CoreModule,
        CharactersModule,
        FilterModule,
        StarshipsModule,
        FilmsModule,
        SpeciesModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            preventDuplicates: true,
            closeButton: true
        }),
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
            }
        }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([]),
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
