# NTI/WEA PainTasker
Úkolníček, který promění vaše úkoly v bolest, abyste mohli dosáhnout svých cílů s odhodláním a bolestí. Ovládněte své úkoly a získávejte bolest z jejich dokončení!

## Code coverage
Již brzy

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

## Poznámky
Již brzy
