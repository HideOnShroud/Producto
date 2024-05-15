import { ChangeEvent, useEffect, useState } from "react";
import Item from "../components/Item";
import Navbar from "../components/Navbar";
import useItem from "../store";
import { ItemInterface } from "../entities/ItemInterface";
import { useNavigate } from "react-router-dom";

const AddPage = () => {
    const addItems = useItem((state) => state.addItem)
    const [item, setItem] = useState<ItemInterface>({
        sku: "",
        name: "",
        price: 0,
        productType: "",
        size: null,
        weight: null,
        height: null,
        width: null,
        length: null
    })
    const [select, setSelect] = useState("")
    const history = useNavigate()
    const addProduct = () => {
        handleSubmit()
        console.log(item)
    }
    const handleSubmit = async () => {
        if (item.sku) {

            if (item) {
                await addItems(item)
                history("/")
            }
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value } = e.target
        setItem((prevItem) => ({
            ...prevItem,
            [name]: value
        }))

    }

    return (
        <>
            <Navbar title="Product Add" button1Action="/" button1="Cancel" button2="Save" button2Action={addProduct} />
            <div className="bg-neutral-50 gap-5 pl-10 pt-20 flex justify-center pr-10 w-full h-[100vh]">
                <form action="" className="flex shadow-md w-5/6 lg:w-1/2 justify-center bg-neutral-100 rounded-xl h-max pb-5 mt-10" method="post">
                    <div className="flex flex-col gap-3 w-2/3 pt-5 pb-5">

                        <label htmlFor="sku" >SKU:</label>
                        <input type="text" onChange={handleChange} className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center" name="sku" id="sku" />
                        <label htmlFor="name" >Name:</label>
                        <input type="text" onChange={handleChange} className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center" name="name" id="name" />
                        <label htmlFor="price" >Price:</label>
                        <input type="number" onChange={handleChange} className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center" name="price" id="price" />
                        <label htmlFor="productType" >Product Type:</label>

                        <select id="productType" onChange={(e) => { setSelect(e.target.value), handleChange }} className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center">
                            <option value=""></option>
                            <option value="Book">Book</option>
                            <option value="DVD">DvD</option>
                            <option value="Furniture">Furniture</option>
                        </select>
                        {select === "Book"
                            ?
                            <>
                                <label htmlFor="weight" >Weight:</label>
                                <input type="number" onChange={handleChange} className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center" name="weight" id="weight" />
                            </>
                            : select === "DVD" ?
                                <>
                                    <label htmlFor="size" className="pl-10 lg:pl-28">Size:</label>
                                    <input type="number" onChange={handleChange} className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center" name="size" id="size" />
                                </>
                                : select === "Furniture" ?
                                    <>
                                        <label htmlFor="height" >Height:</label>
                                        <input type="number" onChange={handleChange} className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center" name="height" id="height" />
                                        <label htmlFor="width" >Width:</label>
                                        <input type="" className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center" name="width" id="width" />
                                        <label htmlFor="length">Length:</label>
                                        <input type="number" onChange={handleChange} className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center" name="length" id="length" />
                                    </>
                                    : ""}

                    </div>
                </form>
            </div>
        </>
    );
}

export default AddPage;