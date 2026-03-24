---
sidebar_position: 2
---

# Users API

Provides endpoints to manage Horizon Truth user profiles, settings, and statistics.

---

## 🚀 Get Current Profile

Fetches the profile and stats of the currently authenticated user.

**Endpoint**: `GET /api/users/me`

**Access Control**: Authenticated (`USER` role or higher).

### Request Headers
| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| `Authorization` | `Bearer <token>` | Yes | JWT Access Token |

### Response
**200 OK**
```json
{
  "id": "uuid-1234",
  "username": "johndoe",
  "email": "johndoe@horizontruth.com",
  "createdAt": "2023-01-01T12:00:00.000Z",
  "stats": {
    "claimsSubmitted": 15,
    "reviewsCompleted": 42,
    "reputationScore": 850
  }
}
```

**401 Unauthorized**
Missing or invalid token.

---

## 🚀 Update Profile

Updates user profile fields.

**Endpoint**: `PATCH /api/users/me`

**Access Control**: Authenticated.

### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `displayName` | `string` | No | Publicly visible name. |
| `bio` | `string` | No | Short biography. |
| `avatarUrl` | `string` | No | Link to an uploaded image. |

```json title="Example Request"
{
  "displayName": "John D.",
  "bio": "Fact checker and data enthusiast."
}
```

### Response
**200 OK**
Returns the updated user object.

---

## 🚀 Get User by ID

Fetches public profile data for a specific user.

**Endpoint**: `GET /api/users/:id`

**Access Control**: Public (Email and private fields are omitted).

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | UUID of the user. |

### Response
**200 OK**
```json
{
  "id": "uuid-5678",
  "username": "janedoe",
  "displayName": "Jane D",
  "stats": {
    "reputationScore": 920
  }
}
```

**404 Not Found**
User does not exist.
