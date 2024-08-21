import { ChangeEvent, useState } from 'react'
import Navbar from '../components/Navbar'
import useItem from '../store'
import { ItemInterface } from '../entities/ItemInterface'
import { ProductValidator } from '../validators/ProductValidator'
import { BookValidator } from '../validators/BookValidator'
import { DVDValidator } from '../validators/DVDValidator'
import { FurnitureValidator } from '../validators/FurnitureValidator'
import { SKUValidator } from '../validators/SKUValidator'
import { NameValidator } from '../validators/NameValidator'
import { PriceValidator } from '../validators/PriceValidator'
import { ProductTypeValidator } from '../validators/ProductTypeValidator'
import { useNavigate } from 'react-router-dom'

const AddPage = () => {
    const addItems = useItem((state) => state.addItem)
    const [item, setItem] = useState<ItemInterface>({
        sku: "",
        name: "",
        price: "",
        product_type: "",
        attributes: {}
    })

    const [notification, setNotification] = useState<string[]>([])
    const [fields, setFields] = useState<{ [key: string]: boolean }>({})
    const [select, setSelect] = useState("")
    const navigate = useNavigate()

    const validateFields = (): boolean => {
        let isValid = true
        const validatorsMap: { [key: string]: ProductValidator } = {
            sku: new SKUValidator(),
            name: new NameValidator(),
            price: new PriceValidator(),
            product_type: new ProductTypeValidator(),
            Book: new BookValidator(),
            DVD: new DVDValidator(),
            Furniture: new FurnitureValidator()
        }

        const validatorsToCheck = [
            { key: 'sku', value: item.sku },
            { key: 'name', value: item.name },
            { key: 'price', value: item.price },
            { key: 'product_type', value: item.product_type }
        ]

        validatorsToCheck.forEach(({ key, value }) => {
            const validator = validatorsMap[key]
            if (validator) {
                const result = validator.validate({ [key]: value })
                setFields((prev) => ({
                    ...prev,
                    [key]: result
                }))
                if (!result) isValid = false
            }
        })

        const attributeValidator = validatorsMap[select]
        if (attributeValidator) {
            const result = attributeValidator.validate(item.attributes)
            setFields((prev) => ({
                ...prev,
                [select]: result
            }))
            if (!result) isValid = false
        }

        return isValid
    }

    const handleSubmit = async () => {
        if (validateFields()) {
            try {
                const success = await addItems(item)
                if (success) {
                    console.log("Item added successfully. Navigating to home.")
                    navigate('/')
                } else {
                    setNotification(["Item with the same SKU already exists."])
                }
            } catch (error) {
                console.error("Failed to add item:", error)
                setNotification(["Failed to add item. Please try again."])
            }
        } else {
            console.log("Validation failed.")
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setItem((prevItem) => {
            const updatedAttributes = name !== 'product_type' ? {
                ...prevItem.attributes,
                [name]: value
            } : prevItem.attributes

            const updatedItem = {
                ...prevItem,
                [name]: value,
                attributes: updatedAttributes
            }

            return updatedItem
        })

        // Perform validation
        validateFields()

        // Update fields state
        setFields((prevFields) => ({
            ...prevFields,
            [name]: value.trim() !== ""
        }))

        if (name === 'product_type') {
            setSelect(value)
        }
    }

    const renderAttributesFields = () => {
        switch (select) {
            case 'Book':
                return (
                    <>
                        <label htmlFor="weight_kg">Weight (kg):</label>
                        <input
                            type="number"
                            name="weight_kg"
                            id="weight"
                            onChange={handleChange}
                            className={`border-2 rounded-md shadow-md w-full self-center ${fields['weight_kg'] === false ? 'border-red-500' : 'border-cyan-900'}`}
                        />
                        <p>Please, provide weight!</p>
                    </>
                )
            case 'DVD':
                return (
                    <>
                        <label htmlFor="size_mb">Size (MB):</label>
                        <input
                            type="number"
                            name="size_mb"
                            id="size"
                            onChange={handleChange}
                            className={`border-2 rounded-md shadow-md w-full self-center ${fields['size_mb'] === false ? 'border-red-500' : 'border-cyan-900'}`}
                        />
                        <p>Please, provide size</p>
                    </>
                )
            case 'Furniture':
                return (
                    <>
                        <label htmlFor="height_cm">Height (cm):</label>
                        <input
                            type="number"
                            name="height_cm"
                            id="height"
                            onChange={handleChange}
                            className={`border-2 rounded-md shadow-md w-full self-center ${fields['height_cm'] === false ? 'border-red-500' : 'border-cyan-900'}`}
                        />
                        <label htmlFor="width_cm">Width (cm):</label>
                        <input
                            type="number"
                            name="width_cm"
                            id="width"
                            onChange={handleChange}
                            className={`border-2 rounded-md shadow-md w-full self-center ${fields['width_cm'] === false ? 'border-red-500' : 'border-cyan-900'}`}
                        />
                        <label htmlFor="length_cm">Length (cm):</label>
                        <input
                            type="number"
                            name="length_cm"
                            id="length"
                            onChange={handleChange}
                            className={`border-2 rounded-md shadow-md w-full self-center ${fields['length_cm'] === false ? 'border-red-500' : 'border-cyan-900'}`}
                        />
                        <p>Please, provide dimensions!</p>

                    </>
                )
            default:
                return null
        }
    }

    return (
        <>
            <Navbar title="Product Add" button1Action="/" button1="Cancel" button2="Save" button2Action={handleSubmit} />
            <div className="bg-neutral-50 gap-5 pl-10 pt-20 flex justify-center pr-10 w-full h-[100vh]">
                <form action="" id="product_form" className="flex shadow-md w-5/6 lg:w-1/2 justify-center bg-neutral-100 rounded-xl h-max pb-5 mt-10" method="post">
                    <div className="flex flex-col gap-3 w-2/3 pt-5 pb-5">
                        <label htmlFor="sku">SKU:</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            className={`border-2 rounded-md shadow-md w-full self-center ${fields['sku'] === false ? 'border-red-500' : 'border-cyan-900'}`}
                            name="sku"
                            id="sku"
                        />
                        {fields['sku'] === false && <p>Please, provide SKU</p>}

                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            className={`border-2 rounded-md shadow-md w-full self-center ${fields['name'] === false ? 'border-red-500' : 'border-cyan-900'}`}
                            name="name"
                            id="name"
                        />
                        {fields['name'] === false && <p>Please, provide name</p>}

                        <label htmlFor="price">Price ($):</label>
                        <input
                            type="number"
                            onChange={handleChange}
                            className={`border-2 rounded-md shadow-md w-full self-center ${fields['price'] === false ? 'border-red-500' : 'border-cyan-900'}`}
                            name="price"
                            id="price"
                        />
                        {fields['price'] === false && <p>Please, provide price</p>}

                        <label htmlFor="product_type">Product Type:</label>
                        <select
                            id="product_type"
                            name="product_type"
                            value={select}
                            onChange={(e) => {
                                handleChange(e)
                                setSelect(e.target.value)
                            }}
                            className={`border-2 rounded-md shadow-md w-full self-center ${fields['product_type'] === false ? 'border-red-500' : 'border-cyan-900'}`}
                        >

                            <option value=""></option>
                            <option value="Book">Book</option>
                            <option value="DVD">DVD</option>
                            <option value="Furniture">Furniture</option>
                        </select>
                        {fields['product_type'] === false && <p>Please, chose product type</p>}

                        {renderAttributesFields()}

                        {notification.length > 0 && notification.map((noti, index) => <p key={index}>{noti}</p>)}
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddPage