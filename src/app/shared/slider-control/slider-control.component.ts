import { Component, forwardRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DEFAULT_SLIDER_CONFIG = {
    behaviour: 'drag',
    connect: true,
    margin: 1,
    tooltips: true,
    step: 1,
};

const noop = () => {
};

export const CUSTOM_SLIDER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderControlComponent),
    multi: true
};

@Component({
    selector: 'app-slider-control',
    templateUrl: './slider-control.component.html',
    styleUrls: ['./slider-control.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        CUSTOM_SLIDER_CONTROL_VALUE_ACCESSOR
    ]
})
export class SliderControlComponent implements ControlValueAccessor, OnInit {
    @Input('min') min = 0;
    @Input('max') max = 1;
    @Input('config')
    set config(value) {
        this._config = {...this._config, ...value};
    }
    get config() {
        return this._config;
    }
    @Input('changeOnSlideEnd') changeOnSlideEnd = false;
    private _config = DEFAULT_SLIDER_CONFIG;
    private _value: number[] = [0];
    private onTouchedCallback: any = noop;
    private onChangeCallback: any = noop;

    constructor() {
    }

    ngOnInit() {
    }

    valueChanged(e) {
        this.writeValue(e);
    }

    // get accessor
    get value(): any {
        return this._value;
    }

    // set accessor
    set value(value: any) {
        if (!this.changeOnSlideEnd) {
            this.writeValue(value);
        }
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
