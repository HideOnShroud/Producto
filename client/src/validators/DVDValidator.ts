import { ProductValidator, ProductAttributes } from "./ProductValidator"


export class DVDValidator extends ProductValidator {
    validate(attributes: ProductAttributes): boolean {
        const sizeStr = attributes.size || ''
        const size = parseFloat(sizeStr)
        return size >= 0
    }
}
