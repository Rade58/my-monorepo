# MySql database

recommendation for production would be to host it on planetscale.com which I'm doing in this case

It is cool because you can create different branches for your datbase and planet scale will be responsible for migrations

Only command you need to execute is

```
npx prisma db push
```

# I'm using planetscale and its cli


I created branch of developmant datbase in this case

command for spinning database

```
pscale connect <name of db> dev --port 3309
```

connection string:

`mysql://root@127.0.0.1:3309/<name of db>`

for anything else check the docs

[docs](https://planetscale.com/docs)
