import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './db.js';

import Region from './backend/models/Region.js';
import Country from './backend/models/Country.js';
import Dish from './backend/models/Dish.js';
import Establishment from './backend/models/Establishment.js';

dotenv.config();

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
if (process.env.MONGO_URI) {
    console.log("MONGO_URI prefix:", process.env.MONGO_URI.substring(0, 15));
}

const regionsData = [
  {
    id: "asia",
    name: "Asia",
    description: "Discover the rich and diverse culinary traditions of Asia, from the spicy curries of India to delicate sushi from Japan.",
    imageUrl: "https://images.unsplash.com/photo-1464817739973-487774d7d10d?q=80&w=2070&auto=format&fit=crop",
    countries: ["Japan", "China", "Thailand", "India"],
  },
  {
    id: "europe",
    name: "Europe",
    description: "Experience the sophisticated flavors of European cuisine, from Italian pasta to French pastries.",
    imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b133dd2b?q=80&w=2070&auto=format&fit=crop",
    countries: ["Italy", "France", "Spain", "Greece"],
  },
  {
    id: "americas",
    name: "The Americas",
    description: "From North to South, explore the diverse tastes of the Americas, including Mexican, Brazilian, and American classics.",
    imageUrl: "https://images.unsplash.com/photo-1518182170546-0766ce6fec05?q=80&w=2070&auto=format&fit=crop",
    countries: ["Mexico", "USA", "Brazil", "Peru"],
  },
  {
    id: "africa",
    name: "Africa",
    description: "Discover the bold and flavorful cuisine of Africa, from North African tagines to West African stews.",
    imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072&auto=format&fit=crop",
    countries: ["Morocco", "Ethiopia", "Egypt"],
  },
];

const countriesData = [
  // Asia
  {
    id: "japan",
    name: "Japan",
    region: "asia",
    description: "Japanese cuisine features delicate flavors and artistic presentation, from sushi to ramen.",
    imageUrl: "https://images.unsplash.com/photo-1493936734716-77ba6da663bf?q=80&w=2069&auto=format&fit=crop",
    traditionalDishes: ["Sushi", "Ramen", "Tempura", "Matcha"]
  },
  {
    id: "china",
    name: "China",
    region: "asia",
    description: "One of the world's oldest cuisines, known for its rich history and diverse regional cooking styles.",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23acbe3a624b?q=80&w=2070&auto=format&fit=crop",
    traditionalDishes: ["Peking Duck", "Dim Sum", "Kung Pao Chicken"]
  },
  {
    id: "thailand",
    name: "Thailand",
    region: "asia",
    description: "Thai food offers a complex balance of sweet, sour, salty, and spicy flavors.",
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1974&auto=format&fit=crop",
    traditionalDishes: ["Pad Thai", "Tom Yum Goong", "Green Curry"]
  },
  // Europe
  {
    id: "italy",
    name: "Italy",
    region: "europe",
    description: "Italian cuisine is known for its pasta, pizza, and rich regional flavors using high-quality simple ingredients.",
    imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2068&auto=format&fit=crop",
    traditionalDishes: ["Pizza", "Pasta Carbonara", "Risotto", "Gelato"]
  },
  {
    id: "france",
    name: "France",
    region: "europe",
    description: "French cuisine is synonymous with fine dining, masterful techniques, and delicious pastries.",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    traditionalDishes: ["Croissant", "Coq au Vin", "Ratatouille", "Macarons"]
  },
  {
    id: "spain",
    name: "Spain",
    region: "europe",
    description: "Spanish cuisine is famous for tapas, fresh seafood, and rich rice dishes like paella.",
    imageUrl: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2070&auto=format&fit=crop",
    traditionalDishes: ["Paella", "Gazpacho", "Tortilla Española", "Churros"]
  },
  // Americas
  {
    id: "mexico",
    name: "Mexico",
    region: "americas",
    description: "Mexican cuisine offers spicy, colorful dishes like tacos and enchiladas, recognized as UNESCO heritage.",
    imageUrl: "https://images.unsplash.com/photo-1518182170546-0766ce6fec05?q=80&w=2070&auto=format&fit=crop",
    traditionalDishes: ["Tacos", "Mole", "Enchiladas", "Guacamole"]
  },
  {
    id: "usa",
    name: "USA",
    region: "americas",
    description: "American cuisine is a melting pot of global influences, famous for burgers, BBQ, and comfort food.",
    imageUrl: "https://images.unsplash.com/photo-1485199692108-c3b537907c4d?q=80&w=2074&auto=format&fit=crop",
    traditionalDishes: ["Burger", "BBQ Ribs", "Apple Pie", "Hot Dog"]
  },
  // Africa
  {
    id: "morocco",
    name: "Morocco",
    region: "africa",
    description: "Moroccan cuisine is famous for its use of spices like saffron and mint, and slow-cooked tagines.",
    imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop",
    traditionalDishes: ["Tagine", "Couscous", "Harira", "Mint Tea"]
  }
];

const dishesData = [
  // Japan
  {
    id: "sushi",
    name: "Sushi",
    description: "A Japanese dish of vinegared rice with seafood or vegetables.",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop",
    country: "Japan"
  },
  {
    id: "ramen",
    name: "Ramen",
    description: "Japanese noodle soup consisting of Chinese-style wheat noodles served in a meat or fish-based broth.",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=2070&auto=format&fit=crop",
    country: "Japan"
  },
  // China
  {
    id: "peking-duck",
    name: "Peking Duck",
    description: "A dish from Beijing that has been prepared since the Imperial era, characterized by its thin, crisp skin.",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21720e3260d?q=80&w=2070&auto=format&fit=crop",
    country: "China"
  },
  // Thailand
  {
    id: "pad-thai",
    name: "Pad Thai",
    description: "A stir-fried rice noodle dish commonly served as street food in Thailand.",
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1974&auto=format&fit=crop",
    country: "Thailand"
  },
  // Italy
  {
    id: "pizza",
    name: "Pizza",
    description: "A classic Italian dish made with dough, tomato sauce, and cheese.",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
    country: "Italy"
  },
  {
    id: "pasta-carbonara",
    name: "Pasta Carbonara",
    description: "An Italian pasta dish from Rome made with egg, hard cheese, cured pork, and black pepper.",
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2071&auto=format&fit=crop",
    country: "Italy"
  },
  // France
  {
    id: "croissant",
    name: "Croissant",
    description: "A buttery, flaky, viennoiserie pastry of Austrian origin, but mostly associated with France.",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2026&auto=format&fit=crop",
    country: "France"
  },
  // Spain
  {
    id: "paella",
    name: "Paella",
    description: "A rice dish originally from Valencia, Spain, often containing seafood, meat, and saffron.",
    imageUrl: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=2070&auto=format&fit=crop",
    country: "Spain"
  },
  // Mexico
  {
    id: "tacos",
    name: "Tacos",
    description: "Traditional Mexican street food with tortilla and various fillings.",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1980&auto=format&fit=crop",
    country: "Mexico"
  },
  // USA
  {
    id: "burger",
    name: "Burger",
    description: "A sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop",
    country: "USA"
  },
  // Morocco
  {
    id: "tagine",
    name: "Tagine",
    description: "A North African stew of spiced meat and vegetables prepared by slow cooking in a shallow earthenware cooking dish.",
    imageUrl: "https://images.unsplash.com/photo-1511690656952-34342d2c28f5?q=80&w=2070&auto=format&fit=crop",
    country: "Morocco"
  }
];

const establishmentsData = [
  // Japan
  {
    id: "sukiyabashi-jiro",
    name: "Sukiyabashi Jiro",
    country: "Japan",
    type: ["fine-dining", "restaurant"],
    description: "World-famous sushi restaurant in Tokyo, known for its master chef Jiro Ono and omakase courses.",
    imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd436d?q=80&w=2070&auto=format&fit=crop",
    rating: 5.0,
    address: "Ginza, Tokyo, Japan"
  },
  {
    id: "ichiran-ramen",
    name: "Ichiran Ramen",
    country: "Japan",
    type: ["casual", "restaurant"],
    description: "Famous for its tonkotsu ramen and solo dining booths.",
    imageUrl: "https://images.unsplash.com/photo-1552611052-05e102951fc4?q=80&w=2064&auto=format&fit=crop",
    rating: 4.7,
    address: "Shibuya, Tokyo, Japan"
  },
  // China
  {
    id: "da-dong",
    name: "Da Dong Roast Duck",
    country: "China",
    type: ["fine-dining", "restaurant"],
    description: "Upscale restaurant famous for its modern take on Peking Duck.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    address: "Chaoyang, Beijing, China"
  },
  // Thailand
  {
    id: "jay-fai",
    name: "Jay Fai",
    country: "Thailand",
    type: ["street-food", "restaurant"],
    description: "Legendary street food stall with a Michelin star, famous for crab omelets.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    address: "Mahachai Road, Bangkok, Thailand"
  },
  // Italy
  {
    id: "osteria-francescana",
    name: "Osteria Francescana",
    country: "Italy",
    type: ["fine-dining", "restaurant"],
    description: "Three-Michelin-star restaurant owned by chef Massimo Bottura.",
    imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
    rating: 5.0,
    address: "Via Stella 22, Modena, Italy"
  },
  {
    id: "da-michele",
    name: "L'Antica Pizzeria da Michele",
    country: "Italy",
    type: ["casual", "pizzeria"],
    description: "Historic pizzeria in Naples, serving classic Margherita and Marinara pizzas.",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop",
    rating: 4.8,
    address: "Via Cesare Sersale 1, Naples, Italy"
  },
  // France
  {
    id: "cafe-de-flore",
    name: "Café de Flore",
    country: "France",
    type: ["cafe", "casual"],
    description: "One of the oldest coffeehouses in Paris, famous for its famous clientele.",
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    rating: 4.5,
    address: "Saint-Germain-des-Prés, Paris, France"
  },
  // Spain
  {
    id: "el-celler-de-can-roca",
    name: "El Celler de Can Roca",
    country: "Spain",
    type: ["fine-dining", "restaurant"],
    description: "A restaurant in Girona, Catalonia, Spain which holds 3 Michelin stars.",
    imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    address: "Girona, Spain"
  },
  // Mexico
  {
    id: "pujol",
    name: "Pujol",
    country: "Mexico",
    type: ["fine-dining", "restaurant"],
    description: "Offers a unique tasting menu of Mexican cuisine by Chef Enrique Olvera.",
    imageUrl: "https://images.unsplash.com/photo-1587574293340-3579217d67ca?q=80&w=2069&auto=format&fit=crop",
    rating: 4.9,
    address: "Polanco, Mexico City, Mexico"
  },
  {
    id: "el-huequito",
    name: "El Huequito",
    country: "Mexico",
    type: ["street-food", "casual"],
    description: "Famous for its tacos al pastor since 1959.",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    address: "Centro Histórico, Mexico City, Mexico"
  },
  // USA
  {
    id: "katzs-delicatessen",
    name: "Katz's Delicatessen",
    country: "USA",
    type: ["casual", "restaurant"],
    description: "No-frills deli with theatrical cutters serving mile-high sandwiches since 1888.",
    imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop",
    rating: 4.8,
    address: "Lower East Side, New York, USA"
  },
  // Morocco
  {
    id: "ricks-cafe",
    name: "Rick's Café",
    country: "Morocco",
    type: ["restaurant", "fine-dining"],
    description: "Romantic restaurant, bar & lounge designed to recreate the bar in the movie Casablanca.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    rating: 4.6,
    address: "Casablanca, Morocco"
  }
];

async function insertData() {
  try {
    // Connect here and await
    await connectDB();

    console.log("Clearing existing data...");
    await Region.deleteMany();
    await Country.deleteMany();
    await Dish.deleteMany();
    await Establishment.deleteMany();

    console.log("Inserting new data...");
    
    await Region.insertMany(regionsData);
    console.log(`✅ Inserted ${regionsData.length} regions`);

    await Country.insertMany(countriesData);
    console.log(`✅ Inserted ${countriesData.length} countries`);

    await Dish.insertMany(dishesData);
    console.log(`✅ Inserted ${dishesData.length} dishes`);

    await Establishment.insertMany(establishmentsData);
    console.log(`✅ Inserted ${establishmentsData.length} establishments`);

    console.log("\n🎉 All data seeded successfully!");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  } finally {
    // Wait a moment before closing to ensure logs are flushed
    setTimeout(() => {
      mongoose.disconnect();
      console.log("Database connection closed.");
      process.exit(0);
    }, 1000);
  }
}

insertData();
