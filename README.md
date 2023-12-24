# NTI/WEA PainTasker
Úkolníček, který promění vaše úkoly v bolest, abyste mohli dosáhnout svých cílů s odhodláním a bolestí. Ovládněte své úkoly a získávejte bolest z jejich dokončení! [Zde jsem](https://wea.pavel-vacha.cz/)

* [https://wea.pavel-vacha.cz/](https://wea.pavel-vacha.cz/) - Landing page
* [https://wea.pavel-vacha.cz/dashboard](https://wea.pavel-vacha.cz/dashboard) - Je tam tlačítko Copy Bearer Token
* [https://weaapi.pavel-vacha.cz/api/v1/todos/](https://weaapi.pavel-vacha.cz/api/v1/todos/) - Endpoint pro uživatelské Todos
* [https://weaapi.pavel-vacha.cz/api/v1/auth/login](https://weaapi.pavel-vacha.cz/api/v1/auth/login) - Endpoint pro login
* [https://wea.pavel-vacha.cz/login](https://wea.pavel-vacha.cz/login) - Přihlášení aplikace

Další endpointy v [dokumentaci](#dokumentace-api)

## Poznámky 
Jeden z požadavků byl na JSON endpoint pro todos. Jelikož moje aplikace je SPA, tak využívá vlatně jen takové to endpointy... Pro získání všech endpointu uživatele použijte GET `https://weaapi.pavel-vacha.cz/api/v1/todos/`, kde v hlavíčce requestu přidáte `Authorization: Bearer jwt-token`. 

```bash
curl  -X GET \
  'https://weaapi.pavel-vacha.cz/api/v1/todos/' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Authorization: Bearer JWT_TOKEN'
```

Pro zjednodušení získání tokenu, jsem po přihlášení přidal tlačítko *Copy Bearer token*. Pokud ho chcete získat také requestem, tak použijte endpoint POST `https://weaapi.pavel-vacha.cz/api/v1/auth/login` s tělem `{ "email":"", "password":"" }`

V Bashi (NE VE WIN CMD):
```bash
curl  -X POST \
  'https://weaapi.pavel-vacha.cz/api/v1/auth/login' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{ "email":"email", "password":"heslo" }'
```


## Technologie
* Frontendová část aplikace byla napsána ve ***Vue***. Nikdy jsem se k tomu nedostal a teď byla ideální příležitost.
* Backendová část aplikace je napsána v ***Nodu*** s **Typescriptem** a s využitím balíčku ***express***.
* ***Docker*** pro kontejnerizaci databáze (***MongoDB***) a Nodovské aplikace

## Bezpečnost
Aplikace je zabezpečená proti útokom SQL injection volbou databáze. XSS za mě řeší Vue. CSRF jsem se vyhnul díky nepoužívání cookies. Hesla jsou zahashovaná pomocí knihovny ***bcrypt***.

## Deployment
Nasazení aplikace proběhlo na vlastní server `pavel-vacha.cz`. V nginx byla vytvořena konfigurace pro subdoménu `wea.pavel-vacha.cz` a `weaapi.pavel-vacha.cz`. Konfigurace jsem opatřil samozřejmě certifikátem od Let's encrypt.

Serverová část aplikace je kontejnerizovaná (+ kontejner s Mongem), pro jendoduché nasazení na cílovém serveru. Konfigurace je vidět v adresáři se serverm v souboru `docker-compose.yml`.

Pro úspěšně spojení s databází a pro ostatní nastavení je třeba mít korektně nastavený `.env`, ukázka jak by měl ideálně vypadat `./server/.env`:
```conf
APP_PORT=5454
MONGODB_CONNECTION_STRING=mongodb://jmeno:heslo@host:27017/?authMechanism=DEFAULT
MONGO_DB_NAME=todo_app
SECRET_KEY=32
MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=password
```

a pro frontend `./client/.env`:
```conf
VITE_ROOT_API=http://host:5454
```

po té pak stačí aplikaci spustit na serveru příkazem
```bash
docker compose --env-file ./.env up -d
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
| POST   | `/api/v1/todos`                | Creates a new todo                    |  `{title:""}`                | CreateTodoDTO          | Required         | Newly created todo   |
| PUT | `/api/v1/todos/:id`            | Updates a todo by ID                  | `id` (string) a v body `{title:"", isDone:""}`       | UpdateTodoDTO          | Required         | Success message        |
| DELETE | `/api/v1/todos/:id`            | Deletes a todo by ID                  | `id` (string)       | DeleteTodoDTO          | Required         | Success message      |
| POST   | `/api/v1/auth/login`           | Sign in user and returns jwt          |  `{email:"", "password"}`                | LoginDTO               | Not required     | JWT token            |
| POST   | `/api/v1/users`                | Creates a new user                    |  `{email:"", passsword:"", name:""}`                | RegisterDTO            | Not required     | Newly created user   |


## Testování 
Pro dokázání toho, že vím co to znamená testovat, jsem otestoval několik položek. Otestoval jsem middlewary, kde jsem ukázal jak probíhá mockování a pak jednu třídu, která se stará o handlování erroru v celé aplikaci. Jelikož nebyl požadavek na žádné procento otestovaní, nechal jsem to takto. Přece jen je to všechno na jedno brdo, jen podchytit ty správne test cases.

Mimo jiné jsem se rozhodl použít nový ***nativní*** test runner v Nodu. Již někdy ve verzi 18 byl v experimentální verzi a ve verzi 21 se dostal do plné ostré verze. (Působí na mě mnohem rychleji a interaktivněji než například Jest). Navíc vývojáři se snažili mít co nejpodobnější rozhraní Jestu, takže migrace je poměrně jednoduchá.

Složka s testy [zde](server/src/tests/)

* `npm run test` - spustí testy (musíte být v /server podaresáři)
