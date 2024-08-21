import { ProductValidator, ProductAttributes } from "./ProductValidator"

export class BookValidator extends ProductValidator {
    validate(attributes: ProductAttributes): boolean {
        // Check if weight_kg is a valid number
        const weightStr = attributes.weight || ''
        const weight = parseFloat(weightStr)
        // Check if price is a valid number and greater than 0
        return weight >= 0
    }
}
