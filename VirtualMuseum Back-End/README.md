# 3D Virtual Museum - Backend API

Production-ready ASP.NET Core 8 Web API for the 3D Virtual Museum project.

## Tech Stack

- **Framework:** ASP.NET Core 8 Web API
- **Database:** SQL Server
- **ORM:** Entity Framework Core 8
- **API Documentation:** Swagger/OpenAPI
- **Architecture:** Clean Architecture (Controllers / Services / Repositories)
- **Authentication:** JWT
- **Password Hashing:** BCrypt

## Prerequisites

- .NET 8 SDK
- SQL Server (LocalDB or full instance)

## Run the Application

```bash
dotnet run --project VirtualMuseum.API
```

- **Base URL:** http://localhost:5209
- **Swagger UI:** http://localhost:5209/swagger

The API creates the database, applies migrations, and seeds data on startup.

---

## API Reference

All responses use this format:

```json
{
  "success": true,
  "data": { ... },
  "message": null
}
```

For errors: `success: false`, `message` contains the error text.

---

### Authentication (Public)

#### Register (User self-registration)

Creates a new user account with name, email, region, and password.

```
POST /api/auth/register
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "region": "North America",
  "password": "MySecure@123"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "userId": "guid",
    "email": "john@example.com",
    "fullName": "John Doe",
    "region": "North America"
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5209/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","region":"North America","password":"MySecure@123"}'
```

---

#### Login (Users & Admins)

Login with email and password. No OTP required. Returns JWT for both users and admins.

```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "MySecure@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "userId": "guid",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "User"
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5209/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"MySecure@123"}'
```

---

#### Forgot Password – Step 1: Request OTP

Submit email. In development, OTP is always `0000`.

```
POST /api/auth/forgot-password/request
```

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5209/api/auth/forgot-password/request \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'
```

---

#### Forgot Password – Step 2: Reset Password

Submit email, OTP, new password, and confirmation. In development, OTP must be `0000`.

```
POST /api/auth/forgot-password/reset
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "otpCode": "0000",
  "newPassword": "NewSecure@456",
  "confirmPassword": "NewSecure@456"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5209/api/auth/forgot-password/reset \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otpCode":"0000","newPassword":"NewSecure@456","confirmPassword":"NewSecure@456"}'
```

---

### Artifacts (GET anonymous, others require JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/artifacts | No | List all artifacts |
| GET | /api/artifacts/{id} | No | Get artifact by ID |
| POST | /api/artifacts | Yes | Create artifact |
| PUT | /api/artifacts/{id} | Yes | Update artifact |
| DELETE | /api/artifacts/{id} | Yes | Delete artifact |

**GET /api/artifacts Example:**
```bash
curl http://localhost:5209/api/artifacts
```

**POST /api/artifacts Example:**
```bash
curl -X POST http://localhost:5209/api/artifacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"slug":"my-artifact","eraId":"era-guid","categoryId":"cat-guid","height":10,"width":5,"depth":3,"createdBy":"user-guid"}'
```

---

### Categories (GET anonymous, others require JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/categories | No | List all |
| GET | /api/categories/{id} | No | Get by ID |
| POST | /api/categories | Yes | Create |
| PUT | /api/categories/{id} | Yes | Update |
| DELETE | /api/categories/{id} | Yes | Delete |

**POST Example:**
```bash
curl -X POST http://localhost:5209/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Sculpture"}'
```

---

### Eras (GET anonymous, others require JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/eras | No | List all |
| GET | /api/eras/{id} | No | Get by ID |
| POST | /api/eras | Yes | Create |
| PUT | /api/eras/{id} | Yes | Update |
| DELETE | /api/eras/{id} | Yes | Delete |

**POST Example:**
```bash
curl -X POST http://localhost:5209/api/eras \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Ancient Greece","startYear":-800,"endYear":-146}'
```

---

### Materials (GET anonymous, others require JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/materials | No | List all |
| GET | /api/materials/{id} | No | Get by ID |
| POST | /api/materials | Yes | Create |
| PUT | /api/materials/{id} | Yes | Update |
| DELETE | /api/materials/{id} | Yes | Delete |

**POST Example:**
```bash
curl -X POST http://localhost:5209/api/materials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Marble"}'
```

---

### Tags (GET anonymous, others require JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/tags | No | List all |
| GET | /api/tags/{id} | No | Get by ID |
| POST | /api/tags | Yes | Create |
| PUT | /api/tags/{id} | Yes | Update |
| DELETE | /api/tags/{id} | Yes | Delete |

**POST Example:**
```bash
curl -X POST http://localhost:5209/api/tags \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Ancient"}'
```

---

### Users (Admin only – requires Admin JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/users | Admin | List all users |
| GET | /api/users/{id} | Admin | Get user by ID |
| POST | /api/users | Admin | Create user |
| PUT | /api/users/{id} | Admin | Update user |
| DELETE | /api/users/{id} | Admin | Delete user |

**GET /api/users Example:**
```bash
curl http://localhost:5209/api/users \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

**POST /api/users Example:**
```bash
curl -X POST http://localhost:5209/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -d '{"fullName":"New User","email":"new@museum.com","region":"Asia","password":"Pass@123","roleId":"user-role-guid","isActive":true}'
```

---

## Default Credentials

### Admin

- **Email:** admin@museum.com
- **Password:** admin@123

### Forgot Password (Development)

- **OTP:** 0000

---

## Using the JWT Token

After login, send the token in the `Authorization` header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## Configuration

Connection string in `VirtualMuseum.API/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=DESKTOP-K4668BN\\MSSQLSERVER02;Database=VirtualMuseumDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

---

## Project Structure

```
VirtualMuseum.sln
├── VirtualMuseum.API/           # Controllers, DTOs, Middleware
├── VirtualMuseum.Application/   # Services, Interfaces
├── VirtualMuseum.Domain/        # Entities
└── VirtualMuseum.Infrastructure/ # DbContext, Repositories, Migrations
```

---

## Testing APIs

Run the test script (with API running):

```powershell
.\API-Tests.ps1
```

---

## Migrations

```bash
# Create migration
dotnet ef migrations add MigrationName -p VirtualMuseum.Infrastructure -s VirtualMuseum.API

# Drop database
dotnet ef database drop -p VirtualMuseum.Infrastructure -s VirtualMuseum.API
```
