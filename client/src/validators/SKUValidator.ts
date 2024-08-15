import { ProductValidator, ProductAttributes } from "./ProductValidator";
import { ValidationResult } from "../entities/ValidationResult"

export class SKUValidator extends ProductValidator {
    validate(attributes: ProductAttributes): ValidationResult {
        const errors: string[] = [];
        const sku = attributes.sku || '';

        !this.isNonEmptyString(sku) && errors.push("SKU cannot be empty.");

        return { isValid: errors.length === 0, errors };
    }
}