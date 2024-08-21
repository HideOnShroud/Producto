import { ItemInterface } from "../entities/ItemInterface"

interface Props {
    item: ItemInterface
}

const Item = ({ item }: Props) => {
    const { sku, name, price, productType, attributes } = item

    const renderAttributes = () => {
        switch (productType) {
            case "Book":
                return attributes!.weight
                    ? `Weight: ${attributes!.weight} Kg`
                    : 'No weight specified'
            case "Dvd":
                return attributes!.size
                    ? `Size: ${attributes!.size} Mb`
                    : 'No size specified'
            case "Furniture":
                const { height, width, length } = attributes!
                return (height && width && length)
                    ? `Dimensions: ${width} x ${height} x ${length}`
                    : 'Incomplete dimensions'
            default:
                return 'No attributes available'
        }
    }

    return (
        <div className="rounded-md border-2 flex-col place-content-center hover:border-cyan-600 ease-out hover:transition-all border-gray-500 bg-stone-50 h-48 w-48 shadow-xl text-center pt-7 pb-7">
            <h1 className="pb-1 text-sm">{sku}</h1>
            <h1 className="pt-1 text-sm pb-1">{name}</h1>
            <h1 className="pt-1 text-sm pb-1">{price ? `${price} $` : 'Price not available'}</h1>
            <h1 className="pt-1 text-sm">{renderAttributes()}</h1>
        </div>
    )
}

export default Item
