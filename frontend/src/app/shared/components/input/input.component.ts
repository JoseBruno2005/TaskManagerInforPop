import { CommonModule } from "@angular/common";
import { Component, forwardRef, Input } from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { InputType } from "../../types/input.type";

@Component({
    standalone: true,
    selector: 'app-input',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
    imports: [CommonModule],
    templateUrl: './input.component.html'
})
export class InputComponent {
    @Input() label = '';
    @Input() type: InputType = 'text';
    @Input() placeholder = '';

    value: string | number = '';
    disabled = false;

    onChange = (value: any) => { };
    onTouched = () => { };

    writeValue(value: any): void {
        this.value = value ?? '';
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    handleInput(event: Event) {
        const input = event.target as HTMLInputElement;

        const value =
            this.type === 'number'
                ? input.valueAsNumber
                : input.value;

        this.value = value;
        this.onChange(value);
    }
}