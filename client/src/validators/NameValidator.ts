// NameValidator.ts
import { ProductValidator, ProductAttributes } from "./ProductValidator"

export class NameValidator extends ProductValidator {
    validate(attributes: ProductAttributes): boolean {
        const name = attributes.name || ''
        // Check if name is not empty
        return name.trim().length > 0
    }
}
