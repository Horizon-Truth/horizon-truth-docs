---
sidebar_position: 1
---

# Authentication API

The Horizon Truth API uses JWT tokens for authenticating and authorizing requests. All protected endpoints must include the `Authorization` header.

```http
Authorization: Bearer <your_jwt_token>
```

---

## 🚀 Login

Authenticates a user and returns access/refresh tokens along with the user payload.

**Endpoint**: `POST /api/auth/login`

**Access Control**: Public

### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | Yes | Registered email address. |
| `password` | `string` | Yes | Account password. |

```json title="Example Request"
{
  "email": "user@horizontruth.com",
  "password": "strongPassword123"
}
```

### Response
**200 OK**
Returns tokens and user data.
```json
{
  "accessToken": "eyJhbGciOiJIUz...",
  "refreshToken": "dGhpcy1pcy1hLXJlZnJlc2gtdG9rZW4...",
  "user": {
    "id": "uuid-1234",
    "email": "user@horizontruth.com",
    "roles": ["USER"]
  }
}
```

**401 Unauthorized**
Invalid credentials.

---

## 🚀 Register

Creates a new user account.

**Endpoint**: `POST /api/auth/register`

**Access Control**: Public

### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | Yes | Valid email. |
| `password` | `string` | Yes | At least 8 characters. |
| `username` | `string` | Yes | Unique handle. |

```json title="Example Request"
{
  "email": "newuser@horizontruth.com",
  "password": "Password123!",
  "username": "newuser"
}
```

### Response
**201 Created**
User successfully created.

**409 Conflict**
Email or username already exists.

---

## 🚀 Refresh Token
Renews an expired access token using a valid refresh token.

**Endpoint**: `POST /api/auth/refresh`

**Access Control**: Public

### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `refreshToken` | `string` | Yes | Token returned upon login. |

### Response
**200 OK**
```json
{
  "accessToken": "eyJhbGciOiJIUz..."
}
```
