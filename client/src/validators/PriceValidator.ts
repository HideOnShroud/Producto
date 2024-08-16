// PriceValidator.ts
import { ProductValidator, ProductAttributes } from "./ProductValidator"

export class PriceValidator extends ProductValidator {
    validate(attributes: ProductAttributes): boolean {
        const priceStr = attributes.price || ''
        const price = parseFloat(priceStr)
        return price >= 0
    }
}
