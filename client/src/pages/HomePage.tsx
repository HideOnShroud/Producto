import { useEffect, useState } from "react"
import Item from "../components/Item"
import Navbar from "../components/Navbar"
import useItem from "../store"


// Commented function is the correct one but 000webhost doesnt allow free Delete requests so i just hide the in the uncommented function
// const HomePage = () => {
//     // Get items and actions from the store
//     const getItems = useItem((state) => state.getItem)
//     const items = useItem((state) => state.item)
//     const deleteItem = useItem((state) => state.deleteItem)

//     // State for selected items
//     const [select, setSelect] = useState<string[]>([])

//     // Fetch items on component mount
//     useEffect(() => {
//         getItems()
//     }, [getItems])

//     const handleClick = (sku: string) => {
//         setSelect(prevSelect =>
//             prevSelect.includes(sku)
//                 ? prevSelect.filter(itemSku => itemSku !== sku)
//                 : [...prevSelect, sku]
//         )
//     }

//     const deleteSelected = async () => {
//         await Promise.all(select.map(sku => deleteItem(sku))).then(() => getItems())
//         setSelect([])
//     }

const HomePage = () => {
    const getItems = useItem((state) => state.getItem)
    const itemsFromStore = useItem((state) => state.item)

    const [items, setItems] = useState(itemsFromStore)
    const [select, setSelect] = useState<string[]>([])

    useEffect(() => {
        getItems()
    }, [getItems])

    useEffect(() => {
        setItems(itemsFromStore)
    }, [itemsFromStore])

    const handleClick = (sku: string) => {
        setSelect(prevSelect =>
            prevSelect.includes(sku)
                ? prevSelect.filter(itemSku => itemSku !== sku)
                : [...prevSelect, sku]
        )
    }

    // Updated deleteSelected function to "hide" items
    const deleteSelected = () => {
        // Update the local items state to exclude the selected items
        setItems(prevItems => prevItems.filter(item => !select.includes(item.sku)))

        // Clear the selection
        setSelect([])
    }

    return (
        <>
            <div>
                <Navbar
                    title="Product List"
                    button1Action="/addproduct"
                    button1="ADD"
                    button2="MASS DELETE"
                    button2Action={deleteSelected}
                />
            </div>
            <div className="flex flex-auto pt-20 flex-row bg-neutral-50 justify-center flex-wrap gap-10 pl-20 pr-20">
                {items.length ? (
                    items.map((item) => (
                        <div
                            key={item.sku}
                            className={select.includes(item.sku) ? "opacity-50 relative" : "relative"}
                            onClick={() => handleClick(item.sku)}
                        >
                            <input
                                type="checkbox"
                                checked={select.includes(item.sku)}
                                className="delete-checkbox absolute z-10 top-4 left-5 size-5"
                            />
                            <Item item={item} />
                        </div>
                    ))
                ) : (
                    <p>No items available</p>
                )}
            </div>
        </>
    )
}

export default HomePage
