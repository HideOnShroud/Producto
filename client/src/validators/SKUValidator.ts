// SKUValidator.ts
import { ProductValidator, ProductAttributes } from "./ProductValidator"

export class SKUValidator extends ProductValidator {
    validate(attributes: ProductAttributes): boolean {
        const sku = attributes.sku || ''
        // Check if SKU is not empty
        return sku.trim().length > 0
    }
}
