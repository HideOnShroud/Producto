// NameValidator.ts
import { ProductValidator, ProductAttributes } from "./ProductValidator";
import { ValidationResult } from "../entities/ValidationResult"


export class NameValidator extends ProductValidator {
    validate(attributes: ProductAttributes): ValidationResult {
        const errors: string[] = [];
        const name = attributes.name || '';

        !this.isNonEmptyString(name) && errors.push("Name cannot be empty.");

        return { isValid: errors.length === 0, errors };
    }
}