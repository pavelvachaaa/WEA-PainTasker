# NTI/WEA PainTasker
Úkolníček, který promění vaše úkoly v bolest, abyste mohli dosáhnout svých cílů s odhodláním a bolestí. Ovládněte své úkoly a získávejte bolest z jejich dokončení!


TODO: Přidat tlačítko na zobrazení tokenu a tlačítko na zobrazení všech todos pomocí přesměrování a appendnutí tokenu

## Technologie
Již brzy

## Deployment

Pro úspěšně spojení s databází a pro ostatní nastavení je třeba mít korektně nastavený `.env`, ukázka jak by měl ideálně vypadat:
```conf
APP_PORT=5454
MONGODB_CONNECTION_STRING=mongodb://jmeno:heslo@host:27017/?authMechanism=DEFAULT
MONGO_DB_NAME=todo_app
SECRET_KEY=32
MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=password
```

a pro frontend `.env`:
```conf
VITE_ROOT_API=http://localhost:5454
```

```bash
# Pro DEV
docker compose  --env-file ./.env up -d


```

## Dokumentace API

V průběhu tvorby API jsem se snažil dodržovat standardy a nějaké konvence pro REST API. (Metody, jak by měla být správně cesta ke zdroji, ...). Cesty, co vyžadují autentifikaci, tak potřebují mít v hlavičce requestu `Authorization: Bearer jwt-token`. API v případě jakéhokoliv úspěchu vrací normalizovanou odpověď ve tvaru: 

```json
{
  "message": "Úspěšně jsme vás přihlásili",
  "data": {
    "token": "jwt-token",
    "cokoliv":"dalsiho"
  },
  "errors": [],
  "responseCode": 200
}
```

V případě neúspěchu zpravidla API vrací odpověď s odpovídajícím status kódem ve tvaru:
```json
{
  "message": "Nastala chyba"
}
```

| Method | Route                          | Description                           | Parameters          | Request Body           | Authentication   | Response             |
|--------|--------------------------------|---------------------------------------|---------------------|------------------------|------------------|----------------------|
| GET    | `/api/v1/todos`                | Retrieves all user todos              | None                | None                   | Required         | Array of user todos  |
| GET    | `/api/v1/todos/:id`            | Retrieves a specific todo by ID       | `id` (string)       | ResourceDTO            | Required         | Specific todo        |
| POST   | `/api/v1/todos`                | Creates a new todo                    | None                | CreateTodoDTO          | Required         | Newly created todo   |
| PUT | `/api/v1/todos/:id`            | Updates a todo by ID                  | `id` (string)       | UpdateTodoDTO          | Required         | Updated todo         |
| DELETE | `/api/v1/todos/:id`            | Deletes a todo by ID                  | `id` (string)       | DeleteTodoDTO          | Required         | Success message      |
| POST   | `/api/v1/auth/login`           | Sign in user and returns jwt          | None                | LoginDTO               | Not required     | JWT token            |
| POST   | `/api/v1/users`                | Creates a new user                    | None                | RegisterDTO            | Not required     | Newly created user   |
