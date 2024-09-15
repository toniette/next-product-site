# Backend

Given you read the [README](../README.md) file, you should have a good understanding of the project. This document will focus on the backend part of the project.

## User API Endpoints for Large Dataset

### Get a specific user by ID

```http
GET /api/users/:id
```

#### Response

```json
{
  "id": "a85312c0-6b44-495b-b878-9cc31004bbf7",
  "firstName": "Furman",
  "lastName": "Reichel",
  "phoneNumber": "1-982-746-7287 x2297",
  "email": "Furman.Reichel42@gmail.com"
}
```

### Get user orders

```http
GET /api/users/:id/orders
```

#### Response

```json
[
  {
    "user": "e7524b77-c241-465f-9201-21e0ada4856b",
    "items": [
      {
        "id": "2b7166b9-1d86-49da-8b14-c4f017cdaf81",
        "name": "Intelligent Steel Sausages",
        "price": "334.00",
        "count": 3
      }
    ],
    "total": 3140,
    "time": "2024-09-04T01:39:17.679Z"
  }
]
```

### Get user total spending

```http
GET /api/users/:id/spends
```

#### Response

```json
{
  "value": 3140
}
```
