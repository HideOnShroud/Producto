import { ProductValidator, ProductAttributes } from "./ProductValidator";
import { ValidationResult } from "../entities/ValidationResult"


export class DVDValidator extends ProductValidator {
    validate(attributes: ProductAttributes): ValidationResult {
        const size = attributes.size_mb || '';
        const errors = [
            ...(parseFloat(size) <= 0 || !this.isValidNumber(size) ? ["Size must be greater than 0."] : [])
        ];
        return { isValid: errors.length === 0, errors };
    }
}