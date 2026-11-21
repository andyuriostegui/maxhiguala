import PricePanel from "../../components/admin/PricePanel";
import { getAdminDishes } from "../../lib/menu";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  return <PricePanel dishes={await getAdminDishes()} />;
}
