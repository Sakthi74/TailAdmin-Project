import { Check, X } from "lucide-react";
import { Card } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Progress } from "../../../ui/progress";
import { benefits } from "../../../data/benifitBIlling";
const PlanDetails = () => {
  const ordersUsed = 15299;
  const ordersLimit = 25500;
  const percentUsed = (ordersUsed / ordersLimit) * 100;

  return (
    <Card className="w-full rounded-2xl border border-border bg-card p-0 lg:overflow-hidden overflow-auto">
      <div className="px-6 py-5 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Plan Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* left div current plan stats */}
        <div className="rounded-xl border border-border divide-y divide-border">
          <div className="px-4 py-3">
            <p className="text-sm text-muted-foreground">Current Plan</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">
              Professional
            </p>
          </div>

          <div className="px-4 py-3">
            <p className="text-sm text-muted-foreground">Monthly Limits</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">
              25,000 Orders
            </p>
          </div>

          <div className="px-4 py-3">
            <p className="text-sm text-muted-foreground">Cost</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">
              $199.00/month
            </p>
          </div>

          <div className="px-4 py-3">
            <p className="text-sm text-muted-foreground">Renewal Date</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">
              Mar 22, 2028
            </p>
          </div>

          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">Orders</p>
              <p className="text-sm text-muted-foreground">
                {ordersUsed.toLocaleString()} of {ordersLimit.toLocaleString()}{" "}
                orders used
              </p>
            </div>
            <Progress value={percentUsed} />
          </div>
        </div>

        {/* rightside benefits + actions */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Plan Benefits
            </h3>
            <ul className="space-y-2.5">
              {benefits.map((benefit) => (
                <li
                  key={benefit.label}
                  className={`flex items-center gap-2 text-sm ${
                    benefit.included
                      ? "text-foreground"
                      : "text-muted-foreground line-through"
                  }`}
                >
                  {benefit.included ? (
                    <Check size={16} className="text-blue-500 shrink-0" />
                  ) : (
                    <X size={16} className="text-muted-foreground shrink-0" />
                  )}
                  {benefit.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              variant="outline"
              className="
      flex h-12 lg:flex-1 md:flex-1 items-center justify-center gap-2
      rounded-lg border border-border
      px-1 text-sm font-medium
      dark:text-foreground
      hover:bg-muted 
      sm:dark:bg-[#1C2938]
      sm:w-2/3  sm:flex-none text-[#5B5F76]
    "
            >
              Cancel Subscription
            </Button>
            <Button
              className="
      flex h-12 lg:flex-1 md:flex-1  items-center justify-center gap-2
      rounded-lg bg-[#465FFF]
       text-xs font-medium text-white
      hover:bg-[#3648D8] cursor-pointer text-left
      sm:w-1/2 sm:flex-none md:w-full lg:w-64
    "
            >
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlanDetails;
