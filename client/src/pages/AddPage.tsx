import { ChangeEvent, useState } from "react";
import Navbar from "../components/Navbar";
import useItem from "../store";
import { ItemInterface } from "../entities/ItemInterface";
import { useNavigate } from "react-router-dom";


interface FieldsState {
    [key: string]: { isValid: boolean; clicked: boolean }
}

const AddPage = () => {
    const addItems = useItem((state) => state.addItem)
    const check = useItem((state) => state.check)

    const inputStyle = (fieldName: string): string => {
        return fields[fieldName].clicked && !fields[fieldName].isValid
            ? "border-2 border-red-500 rounded-md shadow-md w-full self-center"
            : "border-2 border-cyan-900 rounded-md shadow-md w-full self-center"
    }

    const onClick = (fieldName: string) => {
        setError(fieldName, fields[fieldName].isValid)
        setFields((prevFields) => ({
            ...prevFields,
            [fieldName]: {
                ...prevFields[fieldName],
                clicked: true,
            },
        }))

    }

    const [notification, setNotification] = useState<string[]>([""])

    const setError = (name: string, isValid: boolean) => {
        const error = `Incorrect ${name}!`

        setNotification((prevNotification) => {
            if (!isValid && !prevNotification.includes(error)) {
                return [...prevNotification, error]
            }
            if (isValid) {
                return prevNotification.filter((notification) => notification !== error)

            }
            return prevNotification
        }

        )




    }

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

    const initialFieldsState = {
        sku: { isValid: false, clicked: false },
        name: { isValid: false, clicked: false },
        price: { isValid: false, clicked: false },
        size: { isValid: false, clicked: false },
        weight: { isValid: false, clicked: false },
        height: { isValid: false, clicked: false },
        width: { isValid: false, clicked: false },
        length: { isValid: false, clicked: false },
    }

    const [fields, setFields] = useState<FieldsState>(initialFieldsState)

    const [select, setSelect] = useState("")
    const history = useNavigate()
    const addProduct = () => {
        handleSubmit()
        console.log(item)
    }
    const handleSubmit = async () => {
        console.log(fields)
        if (Object.values(fields).every(field => field.isValid)) {
            if (item) {
                await addItems(item)
                if (check)
                    history("/")
                else {
                    setNotification(["SKU exists!"])
                }
            }
        }


    }
    const regex = /^\d{1,10}(\.\d{0,2})?$/

    const isValidInput = (name: string, value: string) => {
        switch (name) {
            case "sku":
            case "name":
                return value.trim() !== ""
            case "price":
            case "size":
            case "weight":
            case "height":
            case "width":
            case "length":
                return regex.test(value)
            default:
                return false
        }
    }

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        const isValid = isValidInput(name, value)
        setError(name, isValid)
        setItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }))

        setFields((prevFields) => ({
            ...prevFields,
            [name]: {
                ...prevFields[name],
                isValid,
            },
        }))
        typeCheck()


    }

    const typeCheck = () => {

        if (select === "DVD") {
            setItem((prevItem) => ({
                ...prevItem,
                ['weight']: null,
                ['height']: null,
                ['width']: null,
                ['length']: null,
            }))
            setFields((prevFields) => ({
                ...prevFields,
                ['weight']: { isValid: true, clicked: true },
                ['width']: { isValid: true, clicked: true },
                ['height']: { isValid: true, clicked: true },
                ['length']: { isValid: true, clicked: true },
            }))
        } else if (select === "Book") {
            setItem((prevItem) => ({
                ...prevItem,
                ['size']: null,
                ['height']: null,
                ['width']: null,
                ['length']: null,
            }))
            setFields((prevFields) => ({
                ...prevFields,
                ['size']: { isValid: true, clicked: true },
                ['width']: { isValid: true, clicked: true },
                ['height']: { isValid: true, clicked: true },
                ['length']: { isValid: true, clicked: true },
            }))
        } else if (select === "Furniture") {
            setItem((prevItem) => ({
                ...prevItem,
                ['weight']: null,
                ['size']: null,
            }))
            setFields((prevFields) => ({
                ...prevFields,
                ['weight']: { isValid: true, clicked: true },
                ["size"]: { isValid: true, clicked: true },
            }))
        }
    }

    return (
        <>
            <Navbar title="Product Add" button1Action="/" button1="Cancel" button2="Save" button2Action={addProduct} />
            <div className="bg-neutral-50 gap-5 pl-10 pt-20 flex justify-center pr-10 w-full h-[100vh]">
                <form action="" id="product-form" className="flex shadow-md w-5/6 lg:w-1/2 justify-center bg-neutral-100 rounded-xl h-max pb-5 mt-10" method="post">
                    <div className="flex flex-col gap-3 w-2/3 pt-5 pb-5">

                        <label htmlFor="sku" >SKU:</label>
                        <input type="text" onClick={() => onClick('sku')} onChange={handleChange} className={inputStyle('sku')} name="sku" id="sku" />
                        <label htmlFor="name" >Name:</label>
                        <input type="text" onChange={handleChange} onClick={() => onClick('name')} className={inputStyle('name')} name="name" id="name" />
                        <label htmlFor="price" >Price ($):</label>
                        <input type="number" onChange={handleChange} onClick={() => onClick('price')} className={inputStyle('price')} name="price" id="price" />
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
                                <input type="number" onChange={handleChange} onClick={() => onClick('weight')} className={inputStyle('weight')} name="weight" id="weight" />
                                <p>Please Provide Weight in Kg!</p>
                            </>
                            : select === "DVD" ?
                                <>
                                    <label htmlFor="size">Size:</label>
                                    <input type="number" onChange={handleChange} onClick={() => onClick('size')} className={inputStyle('size')} name="size" id="size" />
                                    <p>Please Provide Size in Mb!</p>
                                </>
                                : select === "Furniture" ?
                                    <>
                                        <label htmlFor="height" >Height:</label>
                                        <input type="number" onChange={handleChange} onClick={() => onClick('height')} className={inputStyle('height')} name="height" id="height" />
                                        <label htmlFor="width" >Width:</label>
                                        <input type="" onChange={handleChange} onClick={() => onClick('width')} className={inputStyle('width')} name="width" id="width" />
                                        <label htmlFor="length">Length:</label>
                                        <input type="number" onChange={handleChange} onClick={() => onClick('length')} className={inputStyle('length')} name="length" id="length" />
                                        <p>Please Provide Dimensions in HxWxL!</p>
                                    </>
                                    : ""}
                        {notification ? notification.map((noti) => <p>{noti}</p>) : ""}
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddPage;