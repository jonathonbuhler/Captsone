import { type Laptop } from "./Laptop";

async function getLaptops(): Promise<Laptop[]> {
  const res = await fetch("http://localhost:8000/load-all");
  if (!res.ok) {
    throw new Error("Error loading laptops");
  }
  const laptops = res.json();
  return laptops;
}

async function loadShop(): Promise<Laptop[]> {
  const res = await fetch("http://localhost:8000/load-shop");
  if (!res.ok) {
    throw new Error("Error loading shop");
  }
  const laptops = res.json();
  return laptops;
}

export { getLaptops };
