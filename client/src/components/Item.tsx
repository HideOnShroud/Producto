import { ItemInterface } from "../entities/ItemInterface";

interface props {
    item: ItemInterface
}

const Item = ({ item }: props) => {
    return (
        <>
            <div className="rounded-md border-2 flex-col place-content-center hover:border-cyan-600 ease-out hover:transition-all border-gray-500 bg-stone-50 h-48 w-48 shadow-xl text-center pt-7 pb-7 contain-content">
                <h1 className="pb-1 text-sm">{item.sku}</h1>
                <h1 className="pt-1 text-sm pb-1">{item.name}</h1>
                <h1 className="pt-1 text-sm pb-1">{item.price} $</h1>
                <h1 className="pt-1 text-sm">{item.size ? `Size: ${item.size} Mb`
                    : item.weight ? `Weight: ${item.weight} Kg`
                        : `Dimensions: ${item.width} x ${item.length} x ${item.height}`}</h1>
            </div>

        </>
    );
}

export default Item;