import { Component, forwardRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectControlComponent),
    multi: true
};

@Component({
    selector: 'app-select-control',
    templateUrl: './select-control.component.html',
    styleUrls: ['./select-control.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR
    ]
})
export class SelectControlComponent implements ControlValueAccessor, OnInit {
    @Input('multiple') multiple = false;
    @Input('placeholder') placeholder: string;
    @Input('label') label: string;
    @Input('options') options: any[];
    @Input('defaultOption') defaultOption: any;
    @Input('option.value') optionValue: string;
    @Input('option.text') optionText: string;
    @Input('controlErrors') controlErrors: any;
    @Input('customClass') customClass: string;
    private _value: any = '';
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor() {
    }

    ngOnInit() {
    }

    // get accessor
    get value(): any {
        return this._value;
    }

    // set accessor
    set value(value: any) {
        this.writeValue(value);
    }

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    // From ControlValueAccessor interface including call the onchange callback
    writeValue(value: any) {
        if (value !== this._value) {
            this._value = value;
            this.onChangeCallback(value);
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

}
