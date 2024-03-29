import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'characters',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
