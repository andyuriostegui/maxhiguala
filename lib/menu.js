import { dishes as catalog } from "../data/carta";
import { loadPrices } from "./prices";

export async function getMenuDishes() {
  const prices = await loadPrices();
  return catalog.map((dish) => ({
    ...dish,
    price: Object.prototype.hasOwnProperty.call(prices, dish.id) ? prices[dish.id] : dish.price,
  }));
}

export async function getAdminDishes() {
  return (await getMenuDishes()).map((dish) => ({
    id: dish.id,
    name: dish.name,
    category: dish.category,
    serving: dish.serving || "",
    day: dish.day || "",
    tag: dish.tag || "",
    price: dish.price ?? null,
  }));
}
