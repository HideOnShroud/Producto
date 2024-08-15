import { ProductValidator, ProductAttributes } from "./ProductValidator"

export class FurnitureValidator extends ProductValidator {
    validate(attributes: ProductAttributes): boolean {
        // Check if all dimensions are valid numbers
        const heightStr = attributes.height_cm || ''
        const height = parseFloat(heightStr)
        const widthStr = attributes.width_cm || ''
        const width = parseFloat(widthStr)
        const lengthStr = attributes.length_cm || ''
        const length = parseFloat(lengthStr)

        return (
            height >= 0 &&
            width >= 0 &&
            length >= 0
        )
    }
}
