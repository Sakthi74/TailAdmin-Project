import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import StatusBadge from "../reusable/StatusBadge";
import { getRecentOrders } from "../../ServiceLayer/ProductFetch";
import type { RecentOrder } from "../../ServiceLayer/ProductFetch";

interface Props {
  limit?: number;
}

const RecentCrmOrders = ({ limit = 5 }: Props) => {
  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);

        const data = await getRecentOrders(limit);

        setOrders(data);
      } catch (error) {
        console.error("Error loading orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [limit]);

  return (
    <Card className="w-full p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Recent Orders</h2>

        <div className="flex gap-2">
          <Button variant="outline" className="cursor-pointer p-5" size="sm">
            <Filter size={16} className="mr-1" />
            Filter
          </Button>

          <Button variant="outline" className="cursor-pointer p-5" size="sm">
            See all
          </Button>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="h-12 border-y text-left text-muted-foreground">
              <th className="py-2 text-xs font-medium">Products</th>

              <th className="py-2 text-xs font-medium">Category</th>

              <th className="py-2 text-xs font-medium">Price</th>

              <th className="py-2 text-xs font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-muted-foreground"
                >
                  Loading orders...
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.thumbnail}
                        alt={order.title}
                        className="h-10 w-10 rounded-md border border-white object-cover"
                      />

                      <div>
                        <p className="font-medium">{order.title}</p>

                        <p className="text-xs text-muted-foreground">
                          {order.variant}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 capitalize text-muted-foreground">
                    {order.category}
                  </td>

                  <td className="py-3 text-muted-foreground">
                    ${order.price.toFixed(2)}
                  </td>

                  <td className="py-3">
                    <StatusBadge input={order.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentCrmOrders;
