# Items Module Documentation

## Overview
The Items module manages the inventory of items within the system. It supports CRUD (Create, Read, Update, Delete) operations for items and provides functionality for viewing and managing item details.

## Features
- **Add Item**: Create new items in the inventory.
- **View Items**: Retrieve and display a list of all items.
- **Edit Item**: Update existing item details.
- **Delete Item**: Remove items from the inventory.

## Endpoints

### 1. Add Item
- **URL**: `/api/items`
- **Method**: `POST`
- **Description**: Adds a new item to the inventory.

#### Request Body
```json
{
  "name": "String",
  "brand": "String",
  "model": "String",
  "quantity": "Number",
  "price": "Number",
  "category": "ObjectId",
  "supplier": "ObjectId",
  "createdBy": "ObjectId",
  "updatedBy": "ObjectId"
}
```

#### Response
- **Status**: `201 Created`
- **Body**:
```json
{
  "_id": "ObjectId",
  "name": "String",
  "brand": "String",
  "model": "String",
  "quantity": "Number",
  "price": "Number",
  "category": "ObjectId",
  "supplier": "ObjectId",
  "createdBy": "ObjectId",
  "updatedBy": "ObjectId",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### 2. View Items
- **URL**: `/api/items`
- **Method**: `GET`
- **Description**: Retrieves a list of all items.

#### Response
- **Status**: `200 OK`
- **Body**:
```json
[
  {
    "_id": "ObjectId",
    "name": "String",
    "brand": "String",
    "model": "String",
    "quantity": "Number",
    "price": "Number",
    "category": "ObjectId",
    "supplier": "ObjectId",
    "createdBy": "ObjectId",
    "updatedBy": "ObjectId",
    "createdAt": "ISODate",
    "updatedAt": "ISODate"
  }
]
```

### 3. Edit Item
- **URL**: `/api/items/:id`
- **Method**: `PUT`
- **Description**: Updates an existing item.

#### Request Body
```json
{
  "name": "String",
  "brand": "String",
  "model": "String",
  "quantity": "Number",
  "price": "Number",
  "category": "ObjectId",
  "supplier": "ObjectId",
  "updatedBy": "ObjectId"
}
```

#### Response
- **Status**: `200 OK`
- **Body**:
```json
{
  "_id": "ObjectId",
  "name": "String",
  "brand": "String",
  "model": "String",
  "quantity": "Number",
  "price": "Number",
  "category": "ObjectId",
  "supplier": "ObjectId",
  "createdBy": "ObjectId",
  "updatedBy": "ObjectId",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### 4. Delete Item
- **URL**: `/api/items/:id`
- **Method**: `DELETE`
- **Description**: Deletes an item from the inventory.

#### Response
- **Status**: `204 No Content`
- **Body**: Empty

## Data Models

### Item
- **`_id`**: `ObjectId` - Unique identifier for the item.
- **`name`**: `String` - The name of the item.
- **`brand`**: `String` - The brand of the item.
- **`model`**: `String` - The model of the item.
- **`quantity`**: `Number` - The quantity of the item in stock.
- **`price`**: `Number` - The price of the item.
- **`category`**: `ObjectId` - Reference to the category of the item.
- **`supplier`**: `ObjectId` - Reference to the supplier of the item.
- **`createdBy`**: `ObjectId` - Reference to the user who created the item.
- **`updatedBy`**: `ObjectId` - Reference to the user who last updated the item.
- **`createdAt`**: `ISODate` - Date and time when the item was created.
- **`updatedAt`**: `ISODate` - Date and time when the item was last updated.

## Validation Rules
- **`name`, `brand`, `model`**: Required, non-empty strings.
- **`quantity`, `price`**: Must be positive numbers.
- **`category`, `supplier`**: Must be valid ObjectId references.
- **`createdBy`, `updatedBy`**: Must be valid ObjectId references.

## Error Handling
- **`400 Bad Request`**: Returned if validation fails.
- **`404 Not Found`**: Returned if an item with the specified ID does not exist.
- **`500 Internal Server Error`**: Returned if there is a server error.

## Usage Examples

### Adding an Item
```json
POST /api/items

{
  "name": "Sample Item",
  "brand": "Brand X",
  "model": "Model Y",
  "quantity": 10,
  "price": 99.99,
  "category": "category_id",
  "supplier": "supplier_id",
  "createdBy": "user_id",
  "updatedBy": "user_id"
}
```

### Viewing All Items
```json
GET /api/items
```

### Editing an Item
```json
PUT /api/items/:id
{
  "name": "Updated Item Name",
  "brand": "Updated Brand",
  "model": "Updated Model",
  "quantity": 15,
  "price": 89.99,
  "category": "updated_category_id",
  "supplier": "updated_supplier_id",
  "updatedBy": "user_id"
}
```

### Deleting an Item
```json
DELETE /api/items/:id
```

## Dependencies
- **Categories Module**: The Items module depends on the Categories module for category references.
- **Suppliers Module**: The Items module depends on the Suppliers module for supplier references.
