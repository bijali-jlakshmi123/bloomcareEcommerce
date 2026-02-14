import { PrismaClient, ProductCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@bloomcare.com" },
    update: {},
    create: {
      email: "admin@bloomcare.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Jane Doe",
      password: hashedPassword,
      role: "USER",
    },
  });

  const products: Array<{
    name: string;
    slug: string;
    description: string;
    price: number;
    category: ProductCategory;
    stock: number;
    featured: boolean;
    ecoFriendly: boolean;
    image: string;
    images: string[];
  }> = [
    {
      name: "Organic Cotton Sanitary Pads - Regular",
      slug: "organic-cotton-pads-regular",
      description: "Hypoallergenic organic cotton pads for comfortable period care.",
      price: 299,
      category: ProductCategory.SANITARY_PADS,
      stock: 100,
      featured: true,
      ecoFriendly: true,
      image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800",
      images: [
        "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800",
        "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800",
      ],
    },
    {
      name: "Reusable Menstrual Cup - Size S",
      slug: "menstrual-cup-size-s",
      description: "Medical-grade silicone menstrual cup. Lasts up to 10 years.",
      price: 599,
      category: ProductCategory.MENSTRUAL_CUPS,
      stock: 50,
      featured: true,
      ecoFriendly: true,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800",
      ],
    },
    {
      name: "Tampons - Super Absorbent Pack",
      slug: "tampons-super-pack",
      description: "Convenient tampons for active lifestyles.",
      price: 249,
      category: ProductCategory.TAMPONS,
      stock: 80,
      featured: false,
      ecoFriendly: false,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
      images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800"],
    },
    {
      name: "Hot Water Bag for Cramps",
      slug: "hot-water-bag",
      description: "Relieves menstrual cramps with gentle heat therapy.",
      price: 199,
      category: ProductCategory.HOT_BAGS,
      stock: 60,
      featured: true,
      ecoFriendly: false,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800",
      images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800"],
    },
    {
      name: "Electric Heating Pad",
      slug: "electric-heating-pad",
      description: "Portable electric heating pad for pain relief.",
      price: 449,
      category: ProductCategory.HEATING_PADS,
      stock: 40,
      featured: false,
      ecoFriendly: false,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
      images: ["https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"],
    },
    {
      name: "Period Underwear - High Waist",
      slug: "period-underwear-high-waist",
      description: "Leak-proof reusable period underwear. Absorbs up to 4 tampons worth.",
      price: 799,
      category: ProductCategory.PERIOD_UNDERWEAR,
      stock: 30,
      featured: true,
      ecoFriendly: true,
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
      images: [
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
      ],
    },
    {
      name: "Biodegradable Disposal Bags - Pack of 30",
      slug: "biodegradable-disposal-bags",
      description: "Eco-friendly disposal bags for sanitary products.",
      price: 149,
      category: ProductCategory.DISPOSAL_BAGS,
      stock: 100,
      featured: false,
      ecoFriendly: true,
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
      images: ["https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800"],
    },
    {
      name: "Complete Waste Management Kit",
      slug: "waste-management-kit",
      description: "All-in-one kit with disposal bags, sanitizer, and instructions.",
      price: 349,
      category: ProductCategory.WASTE_MANAGEMENT_KITS,
      stock: 50,
      featured: true,
      ecoFriendly: true,
      image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=800",
      images: ["https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=800"],
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  const blogPosts = [
    {
      title: "Understanding Your Menstrual Cycle",
      slug: "understanding-menstrual-cycle",
      excerpt: "Learn about the phases of your cycle and what to expect.",
      content:
        "Your menstrual cycle has four main phases: menstruation, follicular phase, ovulation, and luteal phase. Understanding these can help you manage symptoms and track your health.\n\nMenstruation typically lasts 3-7 days. The follicular phase sees your body preparing for ovulation. Ovulation is when an egg is released. The luteal phase follows ovulation until your next period.",
      category: "Cycle tracking",
      published: true,
    },
    {
      title: "Natural Pain Relief for Period Cramps",
      slug: "natural-pain-relief-period-cramps",
      excerpt: "Effective home remedies to ease menstrual discomfort.",
      content:
        "1. Heat therapy: Use a hot water bag or heating pad on your lower abdomen.\n2. Exercise: Light yoga or walking can reduce cramping.\n3. Hydration: Drink plenty of water.\n4. Diet: Reduce salt and caffeine; increase magnesium-rich foods.\n5. Herbal teas: Ginger and peppermint tea may help.",
      category: "Pain relief",
      published: true,
    },
    {
      title: "Hygiene Best Practices During Your Period",
      slug: "hygiene-best-practices-period",
      excerpt: "Essential tips for staying fresh and healthy.",
      content:
        "Change your pad or tampon every 4-6 hours. Wash your hands before and after handling products. Choose cotton underwear for breathability. Avoid douching. Dispose of products properly in sealed bags.",
      category: "Hygiene",
      published: true,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log("Seed completed:", { admin: admin.email, user: user.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
