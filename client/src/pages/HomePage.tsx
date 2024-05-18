import { useEffect, useState } from "react";
import Item from "../components/Item";
import Navbar from "../components/Navbar";
import useItem from "../store";

const HomePage = () => {
    const getItems = useItem((state) => state.getItem)
    const items = useItem((state) => state.item)
    useEffect(() => {
        getItems()
    }, [getItems])

    const [select, setSelect] = useState<string[]>([])

    const handleClick = (sku: string) => {
        const isSelected = select.includes(sku)
        if (isSelected) {
            setSelect(prevSelect => prevSelect.filter(itemSku => itemSku !== sku))
        } else {
            setSelect(prevSelect => [...prevSelect, sku])
        }
    }

    const deleter = useItem((state) => state.deleteItem)

    const deleteSelected = () => {
        select.map((item) => deleter(item))
        setSelect([])
    }

    return (
        <>
            <div className="">

                <Navbar title="Product List" button1Action="/addproduct" button1="ADD" button2="MASS DELETE" button2Action={deleteSelected} />
            </div>
            <div className="flex flex-auto pt-20 flex-row bg-neutral-50 justify-center flex-wrap gap-10 pl-20 pr-20">
                {items.map((item) => <div key={item.sku} className={select.includes(item.sku) ? "opacity-50 relative" : "relative"} onClick={() => handleClick(item.sku)}>
                    <input type="checkbox" checked={select.includes(item.sku)} className="delete-checkbox absolute z-10 top-4 left-5 size-5" />
                    <Item item={item} />
                </div>
                )
                }

            </div>
        </>
    );
}

export default HomePage;