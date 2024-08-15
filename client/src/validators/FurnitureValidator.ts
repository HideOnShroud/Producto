import { ProductValidator, ProductAttributes } from "./ProductValidator";
import { ValidationResult } from "../entities/ValidationResult"

export class FurnitureValidator extends ProductValidator {
    validate(attributes: ProductAttributes): ValidationResult {
        const height = attributes.height_cm || '';
        const width = attributes.width_cm || '';
        const length = attributes.length_cm || '';

        const errors = [
            ...(parseFloat(height) <= 0 || !this.isValidNumber(height) ? ["Height must be greater than 0."] : []),
            ...(parseFloat(width) <= 0 || !this.isValidNumber(width) ? ["Width must be greater than 0."] : []),
            ...(parseFloat(length) <= 0 || !this.isValidNumber(length) ? ["Length must be greater than 0."] : [])
        ];

        return { isValid: errors.length === 0, errors };
    }
}