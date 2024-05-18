# Producto App README

## Introduction

Welcome to the Producto App! This web application allows users to manage a list of products including DVDs, Books, and Furniture. The application is built with PHP (without frameworks) adhering to OOP principles, and MySQL for data storage.

## Technology Stack

- **Frontend**: React (TypeScript)
- **Backend**: PHP REST API
- **Styling**: TailwindCSS
- **Database**: MySQL

## General Coding Requirements

### Object-Oriented Programming (OOP)

- **Class Structure**: Utilize OOP to manage different product types through inheritance and polymorphism. An abstract class should encapsulate the main product logic, with concrete classes for each product type.
- **Database Handling**: Use class properties to manage MySQL interactions. Implement setters and getters for accessing and manipulating database values.
- **Avoid Conditional Statements**: Do not use if-else or switch-case statements to handle product type differences.
- **Single Endpoint**: Use one general endpoint for saving products.

## Special Notes

### Handling DELETE Method Limitation

Due to the limitations of the free plan on 000webhost.com, the DELETE method is unavailable. To pass the QA checks, a workaround has been implemented:

- **Hiding Deleted Elements**: Instead of actually deleting products from the database, the frontend hides the deleted elements.

For the complete implementation where the DELETE method for MASS DELETE works as intended, **please refer to the main branch of this repository**.

### Product Type Differences Handling

The Junior Developer Task required managing product type differences without using conditional statements or switches. While this can be achieved in PHP through method overloading, React does not support this feature. Therefore, product type checks are done in React using conditional logic.


## Features

### 1. Product List

Accessible at the root URL: **`https://producto-six.vercel.app/`**

#### Requirements:
- **Display Attributes**: Each product should display its SKU, Name, Price in $, and one product-specific attribute (Size, Weight, or Dimensions).
- **UI Elements**:
  - **"ADD" Button**: Navigates to the "Add Product" page.
  - **"MASS DELETE" Action**: Checkboxes for selecting products to delete and a "MASS DELETE" button to perform the action.

#### Notes:
- Products should be sorted by their primary key in the database.
- Do not use pagination; all products should be listed on a single page.
- Avoid notification messages or alert windows on this page.

### 2. Add Product Page

Accessible at: **`https://producto-six.vercel.app/addproduct`**

#### Form Fields:
- SKU (`#sku`)
- Name (`#name`)
- Price (`#price`)
- Product Type Switcher (`#productType`) with options: DVD, Book, Furniture
- Product-specific attribute fields:
  - Size for DVD (`#size`)
  - Weight for Book (`#weight`)
  - Dimensions for Furniture (`#height`, `#width`, `#length`)

#### Requirements:
- **Dynamic Form**: Change form fields based on selected product type.
- **Field Descriptions**: Show relevant descriptions for product-specific attributes.
- **Validation**:
  - All fields are mandatory.
  - Trigger notification “Please, submit required data” for missing values.
  - Trigger notification “Please, provide the data of indicated type” for invalid values.
- **Notifications**: Should appear on the same page without reloading.
- **Buttons**:
  - **Save**: Save the product and return to the Product List page.
  - **Cancel**: Cancel the action and return to the Product List page.

#### Notes:
- Ensure SKU uniqueness to prevent duplicates.

## Development Notes

- **OOP Implementation**: Create an abstract `Product` class with concrete subclasses `DVD`, `Book`, and `Furniture`.
- **Database Interaction**: Use PHP PDO for secure and efficient database operations.
- **Validation and Error Handling**: Implement robust validation on both the client and server sides.
- **Frontend Enhancements**: Use TailwindCSS for styling and responsiveness.

## Conclusion

Thank you for using the Producto App! This README provides a comprehensive guide to setting up and managing the application. Follow the coding requirements and structure guidelines to ensure a robust and maintainable product management system. If you have any questions or need further assistance, feel free to reach out.
