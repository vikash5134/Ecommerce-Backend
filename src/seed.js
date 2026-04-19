import prisma from "./config/database.js";
import { hashPassword } from "./utils/password.js";

const seedData = async () => {
  try {
    await prisma.review.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    const adminPassword = await hashPassword("admin123");
    const userPassword = await hashPassword("john123");

    await prisma.user.create({
      data: {
        username: "admin",
        email: "admin@example.com",
        password: adminPassword,
        isAdmin: true,
        address: "123 Admin Street",
      },
    });

    await prisma.user.create({
      data: {
        username: "john",
        email: "john@example.com",
        password: userPassword,
        address: "456 User Avenue",
      },
    });

    const products = [
      {
        name: "Sony WH-1000XM5 Wireless Headphones",
        price: 349.99,
        category: "Electronics",
        stock: 45,
        rating: 4.8,
        numReviews: 342,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        description: "Noise-cancelling wireless headphones",
      },
      {
        name: "Apple Watch Series 9",
        price: 419.99,
        category: "Electronics",
        stock: 38,
        rating: 4.9,
        numReviews: 567,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        description: "Fitness smartwatch",
      },
      {
        name: "Dell XPS 15 Laptop",
        price: 1599.99,
        category: "Computers",
        stock: 18,
        rating: 4.7,
        numReviews: 456,
        image:
          "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80",
        description: "Creator laptop",
      },
      {
        name: "Nike Air Max 270",
        price: 149.99,
        category: "Fashion",
        stock: 156,
        rating: 4.6,
        numReviews: 834,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        description: "Running shoes",
      },
      {
        name: "Ninja Air Fryer Max XL",
        price: 169.99,
        category: "Home",
        stock: 64,
        rating: 4.7,
        numReviews: 2341,
        image:
          "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80",
        description: "Air fryer",
      },
      {
        name: "Bowflex SelectTech Dumbbells",
        price: 349.99,
        category: "Sports",
        stock: 34,
        rating: 4.7,
        numReviews: 678,
        image:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        description: "Adjustable dumbbells",
      },
      {
        name: "Atomic Habits",
        price: 19.99,
        category: "Books",
        stock: 250,
        rating: 4.9,
        numReviews: 45678,
        image:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
        description: "Self-improvement book",
      },
      {
        name: "PlayStation 5 Console",
        price: 499.99,
        category: "Gaming",
        stock: 15,
        rating: 4.9,
        numReviews: 3456,
        image:
          "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80",
        description: "Next-gen console",
      },
      {
        name: "Amazon Echo Dot (5th Gen)",
        price: 49.99,
        category: "Electronics",
        stock: 145,
        rating: 4.5,
        numReviews: 3456,
        image:
          "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80",
        description: "Smart speaker",
      },
      {
        name: "Logitech MX Master 3S",
        price: 99.99,
        category: "Accessories",
        stock: 67,
        rating: 4.8,
        numReviews: 1234,
        image:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
        description: "Premium wireless mouse",
      },
    ];

    const extraProducts = [
      {
        name: "iPhone 15",
        description: "Latest Apple smartphone",
        price: 999.99,
        category: "Mobiles",
        stock: 55,
        rating: 4.9,
        numReviews: 1200,
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      },
      {
        name: "Samsung Galaxy S24",
        description: "Flagship Android phone",
        price: 899.99,
        category: "Mobiles",
        stock: 60,
        rating: 4.8,
        numReviews: 1100,
        image:
          "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&q=80",
      },
      {
        name: "OnePlus 12",
        description: "Performance Android phone",
        price: 749.99,
        category: "Mobiles",
        stock: 45,
        rating: 4.7,
        numReviews: 980,
        image:
          "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80",
      },
      {
        name: "MacBook Pro 14",
        description: "Apple laptop for creators",
        price: 1999.99,
        category: "Laptops",
        stock: 25,
        rating: 4.9,
        numReviews: 650,
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      },
      {
        name: "Dell Inspiron 16",
        description: "Everyday productivity laptop",
        price: 1299.99,
        category: "Laptops",
        stock: 32,
        rating: 4.6,
        numReviews: 400,
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      },
      {
        name: "HP Envy x360",
        description: "Convertible laptop",
        price: 1099.99,
        category: "Laptops",
        stock: 22,
        rating: 4.5,
        numReviews: 310,
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      },
      {
        name: "Logitech G502 Joystick",
        description: "Precision gaming joystick",
        price: 129.99,
        category: "Gaming",
        stock: 40,
        rating: 4.8,
        numReviews: 205,
        image:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
      },
      {
        name: "Thrustmaster T.16000M",
        description: "High-precision flight joystick",
        price: 169.99,
        category: "Gaming",
        stock: 18,
        rating: 4.7,
        numReviews: 96,
        image:
          "https://images.unsplash.com/photo-1471159641385-49d3b4b8ec4f?w=800&q=80",
      },
      {
        name: "The Alchemist",
        description: "Best-selling motivational novel",
        price: 14.99,
        category: "Books",
        stock: 200,
        rating: 4.8,
        numReviews: 2200,
        image:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
      },
      {
        name: "Educated",
        description: "Memoir by Tara Westover",
        price: 18.99,
        category: "Books",
        stock: 180,
        rating: 4.9,
        numReviews: 1250,
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
      },
      {
        name: "Sapiens",
        description: "A brief history of humankind",
        price: 22.99,
        category: "Books",
        stock: 150,
        rating: 4.9,
        numReviews: 1800,
        image:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
      },
      {
        name: 'Sony Bravia 55" Smart TV',
        description: "4K HDR LED TV",
        price: 899.99,
        category: "Electronics",
        stock: 20,
        rating: 4.6,
        numReviews: 420,
        image:
          "https://images.unsplash.com/photo-1499914485622-a88fac536bfc?w=800&q=80",
      },
      {
        name: "Amazon Fire TV Stick",
        description: "Streaming stick",
        price: 49.99,
        category: "Electronics",
        stock: 150,
        rating: 4.4,
        numReviews: 660,
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      },
      {
        name: "Apple iPad Air",
        description: "Lightweight tablet",
        price: 599.99,
        category: "Electronics",
        stock: 35,
        rating: 4.7,
        numReviews: 540,
        image:
          "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=800&q=80",
      },
      {
        name: "Google Pixel 8",
        description: "Pure Android smartphone",
        price: 699.99,
        category: "Mobiles",
        stock: 27,
        rating: 4.6,
        numReviews: 300,
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      },
      {
        name: "OnePlus Buds Pro",
        description: "Wireless earbuds",
        price: 149.99,
        category: "Accessories",
        stock: 75,
        rating: 4.5,
        numReviews: 270,
        image:
          "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
      },
      {
        name: "Canon EOS M50",
        description: "Mirrorless camera",
        price: 649.99,
        category: "Electronics",
        stock: 11,
        rating: 4.6,
        numReviews: 98,
        image:
          "https://images.unsplash.com/photo-1519183071298-a2962d048b5f?w=800&q=80",
      },
      {
        name: "Nintendo Switch",
        description: "Portable game console",
        price: 299.99,
        category: "Gaming",
        stock: 23,
        rating: 4.8,
        numReviews: 760,
        image:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
      },
      {
        name: "Seagate 2TB External HDD",
        description: "Portable storage",
        price: 89.99,
        category: "Electronics",
        stock: 52,
        rating: 4.5,
        numReviews: 450,
        image:
          "https://images.unsplash.com/photo-1527430253228-e93688616381?w=800&q=80",
      },
      {
        name: "Logitech C920 Webcam",
        description: "Full HD webcam",
        price: 79.99,
        category: "Electronics",
        stock: 48,
        rating: 4.5,
        numReviews: 210,
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      },
      {
        name: "Asus ROG Strix Laptop",
        description: "Gaming laptop",
        price: 1499.99,
        category: "Laptops",
        stock: 15,
        rating: 4.7,
        numReviews: 410,
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      },
      {
        name: "HP Pavilion Desktop",
        description: "Home desktop PC",
        price: 799.99,
        category: "Computers",
        stock: 13,
        rating: 4.3,
        numReviews: 150,
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      },
      {
        name: "Samsung 1TB SSD",
        description: "Fast internal storage",
        price: 119.99,
        category: "Electronics",
        stock: 90,
        rating: 4.8,
        numReviews: 834,
        image:
          "https://images.unsplash.com/photo-1527430253228-e93688616381?w=800&q=80",
      },
      {
        name: "Philips Noise Cancelling Headphones",
        description: "Premium audio headphones",
        price: 199.99,
        category: "Electronics",
        stock: 38,
        rating: 4.6,
        numReviews: 203,
        image:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=80",
      },
      {
        name: "Xiaomi Mi Pad",
        description: "Android tablet",
        price: 299.99,
        category: "Electronics",
        stock: 28,
        rating: 4.4,
        numReviews: 133,
        image:
          "https://images.unsplash.com/photo-1517263904808-5dc5f1f63b7f?w=800&q=80",
      },
      {
        name: "Amazon Basics HDMI Cable",
        description: "4K HDMI cable",
        price: 14.99,
        category: "Accessories",
        stock: 130,
        rating: 4.3,
        numReviews: 98,
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      },
      {
        name: "JBL Flip 6",
        description: "Portable Bluetooth speaker",
        price: 129.99,
        category: "Electronics",
        stock: 29,
        rating: 4.7,
        numReviews: 308,
        image:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
      },
      {
        name: "Fitbit Versa 4",
        description: "Fitness smartwatch",
        price: 229.99,
        category: "Electronics",
        stock: 22,
        rating: 4.4,
        numReviews: 134,
        image:
          "https://images.unsplash.com/photo-1521702816684-2fecf2587180?w=800&q=80",
      },
      {
        name: "Razer BlackWidow Keyboard",
        description: "Mechanical keyboard",
        price: 159.99,
        category: "Gaming",
        stock: 37,
        rating: 4.6,
        numReviews: 412,
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      },
      {
        name: "Beats Solo3",
        description: "Wireless on-ear headphones",
        price: 199.99,
        category: "Electronics",
        stock: 46,
        rating: 4.5,
        numReviews: 220,
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      },
      {
        name: "Anker Portable Charger",
        description: "20000mAh power bank",
        price: 49.99,
        category: "Accessories",
        stock: 95,
        rating: 4.6,
        numReviews: 439,
        image:
          "https://images.unsplash.com/photo-1512446817704-2912d0f9fdd4?w=800&q=80",
      },
      {
        name: "Kindle Paperwhite",
        description: "E-reader with built-in light",
        price: 129.99,
        category: "Books",
        stock: 80,
        rating: 4.7,
        numReviews: 520,
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
      },
      {
        name: "Google Nest Mini",
        description: "Smart speaker with Google Assistant",
        price: 49.99,
        category: "Electronics",
        stock: 110,
        rating: 4.5,
        numReviews: 620,
        image:
          "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=800&q=80",
      },
      {
        name: "Garmin Forerunner 55",
        description: "GPS running watch",
        price: 199.99,
        category: "Sports",
        stock: 14,
        rating: 4.8,
        numReviews: 210,
        image:
          "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=800&q=80",
      },
      {
        name: "Lenovo ThinkPad X1 Carbon",
        description: "Business ultrabook",
        price: 1799.99,
        category: "Laptops",
        stock: 12,
        rating: 4.8,
        numReviews: 290,
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      },
      {
        name: "Bose SoundLink Mini",
        description: "Portable Bluetooth speaker",
        price: 129.99,
        category: "Electronics",
        stock: 20,
        rating: 4.6,
        numReviews: 245,
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      },
      {
        name: "Sony A7 III Camera",
        description: "Full frame mirrorless camera",
        price: 1999.99,
        category: "Electronics",
        stock: 8,
        rating: 4.9,
        numReviews: 134,
        image:
          "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&q=80",
      },
      {
        name: "Microsoft Surface Pro 9",
        description: "2-in-1 tablet/laptop",
        price: 1099.99,
        category: "Computers",
        stock: 17,
        rating: 4.7,
        numReviews: 195,
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      },
      {
        name: "Acer Swift 3",
        description: "Lightweight laptop",
        price: 699.99,
        category: "Laptops",
        stock: 18,
        rating: 4.5,
        numReviews: 210,
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      },
    ];

    const allProducts = [...products, ...extraProducts];

    const valueUpdateFactors = {
      Electronics: 1.15,
      Computers: 1.12,
      Fashion: 1.08,
      Home: 1.1,
      Sports: 1.09,
      Books: 1.04,
      Accessories: 1.07,
      Gaming: 1.12,
    };

    const usdToInr = 82.5; // conversion rate

    const updatedProducts = allProducts.map((product) => {
      const marketPriceUsd =
        product.price * (valueUpdateFactors[product.category] ?? 1);
      const inrPrice = marketPriceUsd * usdToInr;
      return {
        ...product,
        price: Number(inrPrice.toFixed(2)),
      };
    });

    await prisma.product.createMany({ data: updatedProducts });

    console.log("Database seeded successfully!");
    console.log("Admin credentials: admin@example.com / admin123");
    console.log("User credentials: john@example.com / john123");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedData();
