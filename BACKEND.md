# Backend API

The ASP.NET Core backend has moved to its own repository:

**https://github.com/TUSK56/museum_backend**

- PostgreSQL (Npgsql) with EF Core migrations applied automatically on startup
- Deploy on [Railway](https://railway.app) by connecting this repo and linking a PostgreSQL service (`DATABASE_URL` is picked up automatically)

Configure the frontend `NEXT_PUBLIC_API_URL` (or equivalent) to point at your deployed Railway API URL.
