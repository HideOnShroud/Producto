import { ItemInterface } from "../entities/ItemInterface";

interface Props {
    item: ItemInterface;
}

const Item = ({ item }: Props) => {
    const { sku, name, price, product_type, attributes } = item;

    const renderAttributes = () => {
        switch (product_type) {
            case "Book":
                return attributes!.weight_kg
                    ? `Weight: ${attributes!.weight_kg} Kg`
                    : 'No weight specified';
            case "DVD":
                return attributes!.size_mb
                    ? `Size: ${attributes!.size_mb} Mb`
                    : 'No size specified';
            case "Furniture":
                const { height_cm, width_cm, length_cm } = attributes!;
                return (height_cm && width_cm && length_cm)
                    ? `Dimensions: ${width_cm} x ${height_cm} x ${length_cm}`
                    : 'Incomplete dimensions';
            default:
                return 'No attributes available';
        }
    };

    return (
        <div className="rounded-md border-2 flex-col place-content-center hover:border-cyan-600 ease-out hover:transition-all border-gray-500 bg-stone-50 h-48 w-48 shadow-xl text-center pt-7 pb-7">
            <h1 className="pb-1 text-sm">{sku}</h1>
            <h1 className="pt-1 text-sm pb-1">{name}</h1>
            <h1 className="pt-1 text-sm pb-1">{price ? `${price} $` : 'Price not available'}</h1>
            <h1 className="pt-1 text-sm">{renderAttributes()}</h1>
        </div>
    );
};

export default Item;
