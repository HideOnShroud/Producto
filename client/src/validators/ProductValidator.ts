const regex = /^\d{1,10}(\.\d{0,2})?$/

export interface ProductAttributes {
    [key: string]: string
}

export abstract class ProductValidator {
    protected isValidNumber(value: string): boolean {
        return regex.test(value)
    }

    protected isNonEmptyString(value: string): boolean {
        return value.trim().length > 0
    }

    abstract validate(attributes: ProductAttributes): boolean
}
