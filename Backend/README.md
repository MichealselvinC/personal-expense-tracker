# Backend database setup

The API reads `DATABASE_URL` from `Backend/.env`, so the same code works with local PostgreSQL and hosted PostgreSQL providers such as Neon, Supabase, or Render.

## Recommended online setup: Neon

1. Create a project at [neon.tech](https://neon.tech) and create a PostgreSQL database.
2. In the Neon dashboard, select the **pooled** connection string and copy it.
3. Put that value in `Backend/.env`:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
```

4. From the `Backend` directory, start the API once. `Base.metadata.create_all` creates the `users`, `expenses`, and `income` tables in Neon:

```powershell
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

5. Confirm the connection and table creation:

```powershell
.\venv\Scripts\python.exe -c "from sqlalchemy import inspect; from app.database import engine; print(engine.url.render_as_string(hide_password=True)); print(inspect(engine).get_table_names())"
```

For a deployed API, set `DATABASE_URL` in the hosting provider's environment variables instead of committing `.env`. Never commit the real password or connection string.

1. Copy `.env.example` to `.env`.
2. Replace `DATABASE_URL` with the connection string from the provider dashboard.
3. Start the API from this directory:

```powershell
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

To delete and recreate only the `expenses` table in the database selected by `DATABASE_URL`:

```powershell
"RESET" | .\venv\Scripts\python.exe reset_expenses_table.py
```

This permanently deletes expense rows and leaves `users` and `income` unchanged.


## develop by michael selvin
