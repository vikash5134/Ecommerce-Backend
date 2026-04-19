import prisma from "./src/config/database.js";
(async ()=> {
  const c = await prisma.product.count();
  console.log(c);
  await prisma.$disconnect();
})();
