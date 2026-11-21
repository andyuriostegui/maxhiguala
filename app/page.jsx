import Restaurant from "../components/Restaurant";
import { getMenuDishes } from "../lib/menu";

export const dynamic = "force-dynamic";

export default async function Home() {
  return <Restaurant dishes={await getMenuDishes()} />;
}
