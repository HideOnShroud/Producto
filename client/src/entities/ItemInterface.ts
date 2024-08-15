// entities/ItemInterface.ts
export interface ItemInterface {
    sku: string;
    name: string;
    price: string;
    product_type: string;
    attributes: {
        weight_kg?: string;
        size_mb?: string;
        height_cm?: string;
        width_cm?: string;
        length_cm?: string;
    };
    height_cm?: string;
    width_cm?: string;
    length_cm?: string;
    weight_kg?: string;
    size_mb?: string;
}
