import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@shophub.com';
  
  // Check if admin exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existingAdmin) {
    console.log('Admin user already exists!');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
      address: 'ShopHub HQ',
    }
  });
  
  console.log('Admin user created successfully:', admin.username);
  console.log('Login credentials => Email: admin@shophub.com | Password: admin123');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
