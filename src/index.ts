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
