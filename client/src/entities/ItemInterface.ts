// entities/ItemInterface.ts
export interface ItemInterface {
    sku: string
    name: string
    price: string
    productType: string
    attributes: {
        weight?: string
        size?: string
        height?: string
        width?: string
        length?: string
    }
    height?: string
    width?: string
    length?: string
    weight?: string
    size?: string
}
