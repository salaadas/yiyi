# In case I forget in the future, please look at this

_Jan - 2022_

## Init and set up prisma

Init:

```bash
$ npm init -y
```

Install these dependencies first:

```bash
$ yarn add typescript prisma @types/node
$ yarn add -D nodemon
```

_I use nodemon for auto reloading_

---

Then, create a `src` dir and add a `.ts` file (in this case I went with `index.ts`)

```bash
$ mkdir src && touch src/index.ts
```

Set up the workflow:

In `package.json`, add this to the `"scripts"`:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "watch": "tsc -w",
  "dev": "nodemon dist/index.js",
  "start": "node dist/index.js"
},
```

**dev:** transpile the `.ts` files to `.js` and place those in `./dist/` folder

**start:** run the `index.js` from `./dist/` in watch mode

---

Configuring `prisma` (This guide uses `prisma` with `postgresql`)

In the terminal, do this:

```bash
$ npx prisma init
```

Then fill out the `.env` file (Remember to create a database)

In the `schema.prisma` inside `./prisma/`, fill out this example:

```typescript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Message {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  content   String
  important Boolean  @default(false)
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
}

model User {
  id       Int       @id @default(autoincrement())
  email    String    @unique @db.VarChar(100)
  name     String    @unique @db.VarChar(100)
  password String
  messages Message[]
}
```

To make a migration, do this:

```bash
$ npx prisma migrate dev --name "your desired name"
```

It make a migration and apply the changes to the database, along with generating `Prisma Client`

---

Prisma Client:

Inside the `index.ts`, fill this example in:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
})()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```
