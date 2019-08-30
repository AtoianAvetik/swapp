import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './_services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
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
