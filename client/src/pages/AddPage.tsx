import React, { ChangeEvent, useState } from 'react';
import Navbar from '../components/Navbar';
import useItem from '../store';
import { ItemInterface } from '../entities/ItemInterface';
import { ProductValidator } from '../validators/ProductValidator';
import { BookValidator } from '../validators/BookValidator';
import { DVDValidator } from '../validators/DVDValidator';
import { FurnitureValidator } from '../validators/FurnitureValidator';
import { SKUValidator } from '../validators/SKUValidator';
import { NameValidator } from '../validators/NameValidator';
import { PriceValidator } from '../validators/PriceValidator';
import { ProductTypeValidator } from '../validators/ProductTypeValidator';
import { useNavigate } from 'react-router-dom';

const validators: { [key: string]: ProductValidator } = {
    sku: new SKUValidator(),
    name: new NameValidator(),
    price: new PriceValidator(),
    product_type: new ProductTypeValidator(),
    Book: new BookValidator(),
    DVD: new DVDValidator(),
    Furniture: new FurnitureValidator()
};

const AddPage: React.FC = () => {
    const addItems = useItem((state) => state.addItem);
    const [item, setItem] = useState<ItemInterface>({
        sku: "",
        name: "",
        price: "",
        product_type: "",
        attributes: {}
    });

    const [notifications, setNotifications] = useState<{ [key: string]: string }>({});
    const [select, setSelect] = useState("");
    const navigate = useNavigate();

    const validateField = (key: string, value: string) => {
        const validator = validators[key];
        if (validator) {
            const result = validator.validate({ [key]: value });
            if (!result.isValid) {
                setNotifications(prev => ({ ...prev, [key]: (result.errors || []).join(', ') }));
            } else {
                setNotifications(prev => ({ ...prev, [key]: '' }));
            }
        }
    };

    const validateAttributes = (attributes: { [key: string]: string }) => {
        const attributeValidator = validators[select];
        if (attributeValidator) {
            const result = attributeValidator.validate(attributes);
            if (!result.isValid) {
                setNotifications(prev => ({ ...prev, attributes: (result.errors || []).join(', ') }));
            } else {
                setNotifications(prev => ({ ...prev, attributes: '' }));
            }
        }
    };

    const validateAllFields = () => {
        // Validate individual fields
        ['sku', 'name', 'price', 'product_type'].forEach(key => {
            const value = item[key as keyof ItemInterface] || ''; // Provide a default value if undefined
            validateField(key, value.toString());
        });

        // Validate attributes based on selected product type
        validateAttributes(item.attributes);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setItem(prevItem => {
            const newItem = {
                ...prevItem,
                [name]: value,
                attributes: {
                    ...prevItem.attributes,
                    [name]: value
                }
            };

            if (name === 'product_type') {
                setSelect(value);
            } else {
                validateField(name, value);
            }

            return newItem;
        });

        if (name !== 'product_type') {
            validateAttributes({
                ...item.attributes,
                [name]: value
            });
        }
    };

    const handleSubmit = async () => {
        validateAllFields(); // Validate all fields before submission

        if (Object.values(notifications).every(msg => msg === '')) { // Check if there are no errors
            try {
                const success = await addItems(item);
                if (success) {
                    navigate('/');
                } else {
                    setNotifications(prev => ({ ...prev, general: "Item with the same SKU already exists." }));
                }
            } catch (error) {
                setNotifications(prev => ({ ...prev, general: "Failed to add item. Please try again." }));
            }
        } else {
            console.log("Validation errors:", notifications);
        }
    };

    const renderAttributesFields = () => {
        switch (select) {
            case 'Book':
                return (
                    <>
                        <label htmlFor="weight_kg">Weight (kg):</label>
                        <input
                            type="number"
                            name="weight_kg"
                            id="weight_kg"
                            onChange={handleChange}
                            className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center"
                        />
                        {notifications['attributes'] && <p>{notifications['attributes']}</p>}
                    </>
                );
            case 'DVD':
                return (
                    <>
                        <label htmlFor="size_mb">Size (MB):</label>
                        <input
                            type="number"
                            name="size_mb"
                            id="size_mb"
                            onChange={handleChange}
                            className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center"
                        />
                        {notifications['attributes'] && <p>{notifications['attributes']}</p>}
                    </>
                );
            case 'Furniture':
                return (
                    <>
                        <label htmlFor="height_cm">Height (cm):</label>
                        <input
                            type="number"
                            name="height_cm"
                            id="height_cm"
                            onChange={handleChange}
                            className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center"
                        />
                        <label htmlFor="width_cm">Width (cm):</label>
                        <input
                            type="number"
                            name="width_cm"
                            id="width_cm"
                            onChange={handleChange}
                            className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center"
                        />
                        <label htmlFor="length_cm">Length (cm):</label>
                        <input
                            type="number"
                            name="length_cm"
                            id="length_cm"
                            onChange={handleChange}
                            className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center"
                        />

                        {notifications['attributes'] && <p>{notifications['attributes']}</p>}
                    </>
                );
            default:
                return null;
        }
    };

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
                            className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center"
                            name="sku"
                            id="sku"
                        />
                        {notifications['sku'] && <p>{notifications['sku']}</p>}

                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center"
                            name="name"
                            id="name"
                        />
                        {notifications['name'] && <p>{notifications['name']}</p>}

                        <label htmlFor="price">Price ($):</label>
                        <input
                            type="number"
                            onChange={handleChange}
                            className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center"
                            name="price"
                            id="price"
                        />
                        {notifications['price'] && <p>{notifications['price']}</p>}

                        <label htmlFor="product_type">Product Type:</label>
                        <select
                            id="product_type"
                            name="product_type"
                            value={select}
                            onChange={(e) => {
                                handleChange(e);
                                setSelect(e.target.value);
                            }}
                            className="border-2 border-cyan-900 rounded-md shadow-md w-full self-center"
                        >
                            <option value=""></option>
                            <option value="Book">Book</option>
                            <option value="DVD">DVD</option>
                            <option value="Furniture">Furniture</option>
                        </select>

                        {renderAttributesFields()}

                        {notifications['general'] && <p>{notifications['general']}</p>}
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddPage;