// ProductTypeValidator.ts
import { ProductValidator, ProductAttributes } from "./ProductValidator"

export class ProductTypeValidator extends ProductValidator {
    validate(attributes: ProductAttributes): boolean {
        const productType = attributes.product_type || ''
        // Check if product_type is not empty
        return productType.trim().length > 0
    }
}
