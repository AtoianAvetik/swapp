import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { SelectControlComponent } from './select-control/select-control.component';
import { SliderControlComponent } from './slider-control/slider-control.component';
import { NouisliderModule } from 'ng2-nouislider';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        SelectControlComponent,
        SliderControlComponent,
        NouisliderModule,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        NouisliderModule,
    ],
    declarations: [
        SelectControlComponent,
        SliderControlComponent,
    ],
})
export class SharedModule {
}
