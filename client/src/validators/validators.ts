// validators.ts
import { ProductValidator, ProductAttributes } from "./ProductValidator";
import { ValidationResult } from "../entities/ValidationResult";

const regex = /^\d{1,10}(\.\d{0,2})?$/;

const validationRules = {
    name: {
        validate: (value: string) => value.trim() !== "",
        error: "Name cannot be empty."
    },
    sku: {
        validate: (value: string) => value.trim() !== "",
        error: "SKU cannot be empty."
    },
    price: {
        validate: (value: string) => value.trim() !== "",
        error: "Incorrect price format."
    },
    product_type: {
        validate: (value: string) => ["Book", "DVD", "Furniture"].includes(value),
        error: "Product type must be selected."
    }
};

export class BookValidator extends ProductValidator {
    validate(attributes: ProductAttributes): ValidationResult {
        const errors: string[] = [];
        const weight = attributes.weight_kg || '';

        if (!this.isValidNumber(weight)) {
            errors.push("Incorrect weight format.");
        }

        return { isValid: errors.length === 0, errors };
    }
}

export class DVDValidator extends ProductValidator {
    validate(attributes: ProductAttributes): ValidationResult {
        const errors: string[] = [];
        const size = attributes.size_mb || '';

        if (!this.isValidNumber(size)) {
            errors.push("Incorrect size format.");
        }

        return { isValid: errors.length === 0, errors };
    }
}

export class FurnitureValidator extends ProductValidator {
    validate(attributes: ProductAttributes): ValidationResult {
        const errors: string[] = [];
        const height = attributes.height_cm || '';
        const width = attributes.width_cm || '';
        const length = attributes.length_cm || '';

        if (!this.isValidNumber(height)) {
            errors.push("Incorrect height format.");
        }
        if (!this.isValidNumber(width)) {
            errors.push("Incorrect width format.");
        }
        if (!this.isValidNumber(length)) {
            errors.push("Incorrect length format.");
        }

        return { isValid: errors.length === 0, errors };
    }
}

export function validateField(field: string, value: string): ValidationResult {
    const rule = validationRules[field as keyof typeof validationRules];
    return rule ? {
        isValid: rule.validate(value),
        errors: rule.validate(value) ? [] : [rule.error]
    } : { isValid: true, errors: [] };
}
