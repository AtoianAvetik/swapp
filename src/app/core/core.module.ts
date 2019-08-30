import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './_services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnectFormDirective } from './_directives/connectForm.directive';

@NgModule({
    declarations: [
        ConnectFormDirective
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
    ],
    providers: [
        ApiService,
    ]
})

export class CoreModule {
}
