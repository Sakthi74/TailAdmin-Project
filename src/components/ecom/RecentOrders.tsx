import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import StatusBadge from "../reusable/StatusBadge";

interface Order {
  id: number;
  title: string;
  variant: string;
  price: number;
  category: string;
  thumbnail: string;
  status: "Delivered" | "Pending" | "Canceled";
}

const statusList: Order["status"][] = ["Delivered", "Pending", "Canceled"];

interface Props {
  limit?: number;
}

const RecentOrders = ({ limit = 5 }: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, [limit]);

  const loadOrders = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
    const data = await res.json();

    const mapped = data.products.map((p: any) => ({
      id: p.id,
      title: p.title,
      variant: `${(p.id % 3) + 1} Variant${p.id % 3 === 0 ? "" : "s"}`,
      price: p.price,
      category: p.category,
      thumbnail: p.thumbnail,
      status: statusList[p.id % statusList.length],
    }));

    setOrders(mapped);
    setLoading(false);
  };

  return (
    <Card className="w-full p-5">
      <header className="flex flex-wrap items-center justify-between gap-3 ">
        <h2 className="text-lg font-semibold">Recent Orders</h2>

        <div className="flex gap-2">
          <Button variant="outline" className="p-5 cursor-pointer" size="sm">
            <Filter size={16} className="mr-1" />
            Filter
          </Button>
          <Button variant="outline" className="p-5 cursor-pointer" size="sm">
            See all
          </Button>
        </div>
      </header>

      <div className="overflow-x-auto ">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="text-left  text-muted-foreground border-y h-12">
              <th className="py-2 font-medium text-xs">Products</th>
              <th className="py-2 font-medium text-xs">Category</th>
              <th className="py-2 font-medium text-xs">Price</th>
              <th className="py-2 font-medium text-xs">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-muted-foreground"
                >
                  Loading orders...
                </td>
              </tr>
            )}

            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-0">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.thumbnail}
                      alt={order.title}
                      className="w-10 h-10 rounded-md border border-white object-cover"
                    />
                    <div>
                      <p className="font-medium">{order.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.variant}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 capitalize text-gray-500">
                  {order.category}
                </td>
                <td className="py-3 text-gray-500">
                  ${order.price.toFixed(2)}
                </td>
                <td className="py-3">
                  <StatusBadge input={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentOrders;
