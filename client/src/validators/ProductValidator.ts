import { ValidationResult } from "../entities/ValidationResult";

export interface ProductAttributes {
    [key: string]: string;
}

const regex = /^\d{1,10}(\.\d{0,2})?$/;

export abstract class ProductValidator {
    protected isValidNumber(value: string): boolean {
        return regex.test(value);
    }

    protected isNonEmptyString(value: string): boolean {
        return value.trim() !== '';
    }

    abstract validate(attributes: ProductAttributes): ValidationResult;
}
