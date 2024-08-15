import { ProductValidator, ProductAttributes } from "./ProductValidator";
import { ValidationResult } from "../entities/ValidationResult"


export class ProductTypeValidator extends ProductValidator {
    validate(attributes: ProductAttributes): ValidationResult {
        const errors: string[] = [];
        const productType = attributes.product_type || '';

        !this.isNonEmptyString(productType) && errors.push("Product type cannot be empty.");

        return { isValid: errors.length === 0, errors };
    }
}