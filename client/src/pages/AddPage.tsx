import { ChangeEvent, useState } from "react";
import Navbar from "../components/Navbar";
import useItem from "../store";
import { ItemInterface } from "../entities/ItemInterface";
import { useNavigate } from "react-router-dom";

interface FieldsState {
    [key: string]: { isValid: boolean; clicked: boolean };
}

const AddPage = () => {
    const addItems = useItem((state) => state.addItem);

    const inputStyle = (fieldName: string): string => {
        return fields[fieldName].clicked && !fields[fieldName].isValid
            ? "border-2 border-red-500 rounded-md shadow-md w-full self-center"
            : "border-2 border-cyan-900 rounded-md shadow-md w-full self-center";
    };

    const onClick = (fieldName: string) => {
        setError(fieldName, fields[fieldName].isValid);
        setFields((prevFields) => ({
            ...prevFields,
            [fieldName]: {
                ...prevFields[fieldName],
                clicked: true,
            },
        }));
    };

    const [notification, setNotification] = useState<string[]>([]);

    const setError = (name: string, isValid: boolean) => {
        const error = `Incorrect ${name}!`;

        setNotification((prevNotification) => {
            if (!isValid && !prevNotification.includes(error)) {
                return [...prevNotification, error];
            }
            if (isValid) {
                return prevNotification.filter((notification) => notification !== error);
            }
            return prevNotification;
        });
    };

    const [item, setItem] = useState<ItemInterface>({
        sku: "",
        name: "",
        price: "",
        product_type: "",
        attributes: {}
    });

    const initialFieldsState: FieldsState = {
        sku: { isValid: false, clicked: false },
        name: { isValid: false, clicked: false },
        price: { isValid: false, clicked: false },
        product_type: { isValid: false, clicked: false },
        weight_kg: { isValid: false, clicked: false },
        size_mb: { isValid: false, clicked: false },
        height_cm: { isValid: false, clicked: false },
        width_cm: { isValid: false, clicked: false },
        length_cm: { isValid: false, clicked: false },
    };

    const [fields, setFields] = useState<FieldsState>(initialFieldsState);
    const [select, setSelect] = useState("");
    const history = useNavigate();

    // Validate fields based on the selected product type
    const validateFields = () => {
        let allValid = true;
        const newFieldsState = { ...fields };
        const validationErrors: string[] = [];

        // Validate based on the product type
        if (select === "Book") {
            if (!item.attributes?.weight_kg || !regex.test(item.attributes.weight_kg)) {
                allValid = false;
                newFieldsState.weight_kg = { isValid: false, clicked: true };
                validationErrors.push("Incorrect weight_kg!");
            } else {
                newFieldsState.weight_kg = { isValid: true, clicked: true };
            }
        }
        if (select === "DVD") {
            if (!item.attributes?.size_mb || !regex.test(item.attributes.size_mb)) {
                allValid = false;
                newFieldsState.size_mb = { isValid: false, clicked: true };
                validationErrors.push("Incorrect size_mb!");
            } else {
                newFieldsState.size_mb = { isValid: true, clicked: true };
            }
        }
        if (select === "Furniture") {
            if (!item.attributes?.height_cm || !regex.test(item.attributes.height_cm)) {
                allValid = false;
                newFieldsState.height_cm = { isValid: false, clicked: true };
                validationErrors.push("Incorrect height_cm!");
            } else {
                newFieldsState.height_cm = { isValid: true, clicked: true };
            }

            if (!item.attributes?.width_cm || !regex.test(item.attributes.width_cm)) {
                allValid = false;
                newFieldsState.width_cm = { isValid: false, clicked: true };
                validationErrors.push("Incorrect width_cm!");
            } else {
                newFieldsState.width_cm = { isValid: true, clicked: true };
            }

            if (!item.attributes?.length_cm || !regex.test(item.attributes.length_cm)) {
                allValid = false;
                newFieldsState.length_cm = { isValid: false, clicked: true };
                validationErrors.push("Incorrect length_cm!");
            } else {
                newFieldsState.length_cm = { isValid: true, clicked: true };
            }
        }

        // General validation
        if (!item.sku.trim()) {
            allValid = false;
            newFieldsState.sku = { isValid: false, clicked: true };
            validationErrors.push("Incorrect SKU!");
        } else {
            newFieldsState.sku = { isValid: true, clicked: true };
        }

        if (!item.name.trim()) {
            allValid = false;
            newFieldsState.name = { isValid: false, clicked: true };
            validationErrors.push("Incorrect name!");
        } else {
            newFieldsState.name = { isValid: true, clicked: true };
        }

        if (!item.price || !regex.test(item.price)) {
            allValid = false;
            newFieldsState.price = { isValid: false, clicked: true };
            validationErrors.push("Incorrect price!");
        } else {
            newFieldsState.price = { isValid: true, clicked: true };
        }

        setFields(newFieldsState);
        setNotification(validationErrors);
        return allValid;
    };



    const handleSubmit = async () => {
        console.log(fields);
        console.log(item);
        console.log(validateFields());
        if (validateFields()) {
            try {
                if (item) {
                    const success = await addItems(item); // Get the result of adding the item

                    if (success) {
                        // If item is added successfully, navigate to home
                        console.log("Item added successfully. Navigating to home.");
                        history("/");
                    } else {
                        // If adding item fails, display error notification
                        console.log("Item could not be added.");
                        setNotification(["Item with same sku already exists."]);
                    }
                } else {
                    // Log or handle the case where item is not defined (shouldn't happen)
                    console.log("Item is not defined or valid.");
                }
            } catch (error) {
                // Log and display error message if adding the item fails
                console.error("Failed to add item:", error);
                setNotification(["Item with the same SKU already exists."]);
            }
        } else {
            console.log("Validation failed.");
        }
    };

    const regex = /^\d{1,10}(\.\d{0,2})?$/;

    const isValidInput = (name: string, value: string) => {
        if (name === "sku" || name === "name" || name === "product_type") {
            return value.trim() !== ""; // Valid if not empty
        }
        return regex.test(value); // Use regex for numeric fields like price, size_mb, weight_kg, etc.
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isValid = isValidInput(name, value);
        setError(name, isValid);

        if (name === "product_type") {
            setSelect(value);
            typeCheck(value); // Update fields based on selected product type
        }

        // Update top-level properties and attributes as needed
        if (["weight_kg", "size_mb", "height_cm", "width_cm", "length_cm"].includes(name)) {
            setItem((prevItem) => ({
                ...prevItem,
                [name]: value, // Update top-level item object
                attributes: {
                    ...prevItem.attributes,
                    [name]: value, // Update attributes object as well
                },
            }));
        } else {
            setItem((prevItem) => ({
                ...prevItem,
                [name]: value,
            }));
        }

        setFields((prevFields) => ({
            ...prevFields,
            [name]: {
                ...prevFields[name],
                isValid,
            },
        }));
    };



    const typeCheck = (product_type: string) => {
        setItem((prevItem) => ({
            ...prevItem,
            height_cm: product_type === "Furniture" ? prevItem.height_cm || "" : undefined,
            width_cm: product_type === "Furniture" ? prevItem.width_cm || "" : undefined,
            length_cm: product_type === "Furniture" ? prevItem.length_cm || "" : undefined,
            weight_kg: product_type === "Book" ? prevItem.weight_kg || "" : undefined,
            size_mb: product_type === "DVD" ? prevItem.size_mb || "" : undefined,
            attributes: {
                ...prevItem.attributes,
                height_cm: product_type === "Furniture" ? prevItem.height_cm || "" : undefined,
                width_cm: product_type === "Furniture" ? prevItem.width_cm || "" : undefined,
                length_cm: product_type === "Furniture" ? prevItem.length_cm || "" : undefined,
                weight_kg: product_type === "Book" ? prevItem.weight_kg || "" : undefined,
                size_mb: product_type === "DVD" ? prevItem.size_mb || "" : undefined,
            },
        }));

        setFields((prevFields) => ({
            ...prevFields,
            height_cm: { isValid: product_type === "Furniture", clicked: product_type === "Furniture" },
            width_cm: { isValid: product_type === "Furniture", clicked: product_type === "Furniture" },
            length_cm: { isValid: product_type === "Furniture", clicked: product_type === "Furniture" },
            weight_kg: { isValid: product_type === "Book", clicked: product_type === "Book" },
            size_mb: { isValid: product_type === "DVD", clicked: product_type === "DVD" },
        }));
    };


    return (
        <>
            <Navbar title="Product Add" button1Action="/" button1="Cancel" button2="Save" button2Action={handleSubmit} />
            <div className="bg-neutral-50 gap-5 pl-10 pt-20 flex justify-center pr-10 w-full h-[100vh]">
                <form action="" id="product_form" className="flex shadow-md w-5/6 lg:w-1/2 justify-center bg-neutral-100 rounded-xl h-max pb-5 mt-10" method="post">
                    <div className="flex flex-col gap-3 w-2/3 pt-5 pb-5">
                        <label htmlFor="sku">SKU:</label>
                        <input type="text" onClick={() => onClick('sku')} onChange={handleChange} className={inputStyle('sku')} name="sku" id="sku" />
                        <label htmlFor="name">Name:</label>
                        <input type="text" onChange={handleChange} onClick={() => onClick('name')} className={inputStyle('name')} name="name" id="name" />
                        <label htmlFor="price">Price ($):</label>
                        <input type="number" onChange={handleChange} onClick={() => onClick('price')} className={inputStyle('price')} name="price" id="price" />
                        <label htmlFor="product_type">Product Type:</label>
                        <select
                            id="product_type"
                            name="product_type"
                            value={select}
                            onChange={handleChange}
                            onClick={() => onClick('product_type')}
                            className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center"
                        >
                            <option value=""></option>
                            <option value="Book">Book</option>
                            <option value="DVD">DVD</option>
                            <option value="Furniture">Furniture</option>
                        </select>
                        {select === "Book"
                            ?
                            <>
                                <label htmlFor="weight_kg">weight_kg:</label>
                                <input type="number" onChange={handleChange} onClick={() => onClick('weight_kg')} className={inputStyle('weight_kg')} name="weight_kg" id="weight_kg" />
                                <p>Please Provide weight_kg in Kg!</p>
                            </>
                            : select === "DVD" ?
                                <>
                                    <label htmlFor="size_mb">size_mb:</label>
                                    <input type="number" onChange={handleChange} onClick={() => onClick('size_mb')} className={inputStyle('size_mb')} name="size_mb" id="size_mb" />
                                    <p>Please Provide size_mb in Mb!</p>
                                </>
                                : select === "Furniture" ?
                                    <>
                                        <label htmlFor="height_cm">height_cm (cm):</label>
                                        <input type="number" onChange={handleChange} onClick={() => onClick('height_cm')} className={inputStyle('height_cm')} name="height_cm" id="height_cm" />

                                        <label htmlFor="width_cm">width_cm (cm):</label>
                                        <input type="number" onChange={handleChange} onClick={() => onClick('width_cm')} className={inputStyle('width_cm')} name="width_cm" id="width_cm" />

                                        <label htmlFor="length_cm">length_cm (cm):</label>
                                        <input type="number" onChange={handleChange} onClick={() => onClick('length_cm')} className={inputStyle('length_cm')} name="length_cm" id="length_cm" />

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