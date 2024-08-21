import { ProductValidator, ProductAttributes } from "./ProductValidator"

export class FurnitureValidator extends ProductValidator {
    validate(attributes: ProductAttributes): boolean {
        // Check if all dimensions are valid numbers
        const heightStr = attributes.height || ''
        const height = parseFloat(heightStr)
        const widthStr = attributes.width || ''
        const width = parseFloat(widthStr)
        const lengthStr = attributes.length || ''
        const length = parseFloat(lengthStr)

        return (
            height >= 0 &&
            width >= 0 &&
            length >= 0
        )
    }
}
