import { ProductValidator, ProductAttributes } from "./ProductValidator";
import { ValidationResult } from "../entities/ValidationResult"

export class BookValidator extends ProductValidator {
    validate(attributes: ProductAttributes): ValidationResult {
        const weight = attributes.weight_kg || '';
        const errors = [
            ...(parseFloat(weight) <= 0 || !this.isValidNumber(weight) ? ["Weight must be greater than 0."] : [])
        ];
        return { isValid: errors.length === 0, errors };
    }

}
