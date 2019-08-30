import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import * as fromFilter from '../filter/filter.reducers';


@NgModule({
    declarations: [
        FilterComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSelectModule,
        StoreModule.forFeature(fromFilter.filterFeatureKey, fromFilter.filterReducers),
    ],
    exports: [
        FilterComponent,
    ]
})
export class FilterModule {
}
