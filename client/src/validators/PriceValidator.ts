import { ProductValidator, ProductAttributes } from "./ProductValidator";
import { ValidationResult } from "../entities/ValidationResult"


export class PriceValidator extends ProductValidator {
    validate(attributes: ProductAttributes): ValidationResult {
        const price = attributes.price || '';
        const errors = [
            ...(parseFloat(price) <= 0 || !this.isValidNumber(price) ? ["Price must be greater than 0."] : [])
        ];
        return { isValid: errors.length === 0, errors };
    }
}
