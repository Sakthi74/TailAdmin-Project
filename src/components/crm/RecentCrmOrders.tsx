import { Filter, Trash2 } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";

interface Deal {
  id: string;
  dealId: string;
  customerName: string;
  customerEmail: string;
  product: string;
  dealValue: number;
  closeDate: string;
  status: "Complete" | "Pending" | "Cancel";
}

const DEALS: Deal[] = [
  {
    id: "1",
    dealId: "DE124321",
    customerName: "John Doe",
    customerEmail: "johndoe@gmail.com",
    product: "Software License",
    dealValue: 1850.34,
    closeDate: "2024-06-15",
    status: "Complete",
  },
  {
    id: "2",
    dealId: "DE124322",
    customerName: "Jane Smith",
    customerEmail: "janesmith@gmail.com",
    product: "Cloud Hosting",
    dealValue: 1299.0,
    closeDate: "2024-06-18",
    status: "Pending",
  },
  {
    id: "3",
    dealId: "DE124323",
    customerName: "Michael Brown",
    customerEmail: "michaelbrown@gmail.com",
    product: "Web Domain",
    dealValue: 950.0,
    closeDate: "2024-06-20",
    status: "Cancel",
  },
  {
    id: "4",
    dealId: "DE124324",
    customerName: "Alice Johnson",
    customerEmail: "alicejohnson@gmail.com",
    product: "SSL Certificate",
    dealValue: 230.45,
    closeDate: "2024-06-25",
    status: "Pending",
  },
  {
    id: "5",
    dealId: "DE124325",
    customerName: "Robert Lee",
    customerEmail: "robertlee@gmail.com",
    product: "Premium Support",
    dealValue: 1520.0,
    closeDate: "2024-06-30",
    status: "Complete",
  },
];

const AVATAR_COLORS = [
  "bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
  "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
];

const STATUS_STYLES: Record<Deal["status"], string> = {
  Complete: "text-emerald-600 dark:text-emerald-400",
  Pending: "text-amber-500 dark:text-amber-400",
  Cancel: "text-rose-500 dark:text-rose-400",
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatCurrency = (value: number) =>
  `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const RecentCrmOrders = () => {
  return (
    <Card className="w-full p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>

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
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="h-12 border-y text-left text-muted-foreground">
              <th className="w-10 py-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-600"
                />
              </th>
              <th className="py-2 text-xs font-medium">Deal ID</th>
              <th className="py-2 text-xs font-medium">Customer</th>
              <th className="py-2 text-xs font-medium">Product/Service</th>
              <th className="py-2 text-xs font-medium">Deal Value</th>
              <th className="py-2 text-xs font-medium">Close Date</th>
              <th className="py-2 text-xs font-medium">Status</th>
              <th className="py-2 text-xs font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {DEALS.map((deal, index) => (
              <tr key={deal.id} className="border-b last:border-0">
                <td className="py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600"
                  />
                </td>

                <td className="py-3 font-medium text-foreground">
                  {deal.dealId}
                </td>

                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        AVATAR_COLORS[index % AVATAR_COLORS.length]
                      }`}
                    >
                      {getInitials(deal.customerName)}
                    </div>

                    <div>
                      <p className="font-medium text-foreground">
                        {deal.customerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {deal.customerEmail}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-3 text-muted-foreground">{deal.product}</td>

                <td className="py-3 text-muted-foreground">
                  {formatCurrency(deal.dealValue)}
                </td>

                <td className="py-3 text-muted-foreground">{deal.closeDate}</td>

                <td className="py-3">
                  <span
                    className={`text-xs font-medium ${STATUS_STYLES[deal.status]}`}
                  >
                    {deal.status}
                  </span>
                </td>

                <td className="py-3">
                  <button
                    type="button"
                    className="cursor-pointer text-muted-foreground hover:text-rose-500 dark:hover:text-rose-400"
                    aria-label={`Delete deal ${deal.dealId}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentCrmOrders;
