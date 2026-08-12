import { Pencil } from "lucide-react";
import { Card } from "../../../ui/card";
import { Button } from "../../../ui/button";

interface BillingField {
  label: string;
  value: string;
}

const billingFields: BillingField[] = [
  { label: "Name", value: "Mushafrof Chowdhury" },
  { label: "Street", value: "800 E Elcamino Real, suite #400" },
  { label: "City/State", value: "Mountain View, CA, 94040" },
  { label: "Country", value: "United States of America" },
  { label: "Zip/Postal code", value: "19029" },
  { label: "Town/City", value: "New York" },
  { label: "VAT Number", value: "DE4920348" },
];

const BillingInfo = () => {
  return (
    <Card className="w-full rounded-2xl border border-border bg-card p-0 overflow-hidden">
      <div className="px-6 py-5 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Billing Info</h2>
      </div>

      <div className="p-6">
        <div className="rounded-xl border border-border divide-y divide-border">
          {billingFields.map((field) => (
            <div
              key={field.label}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-4 py-3"
            >
              <p className="text-sm text-muted-foreground w-full sm:w-32 shrink-0">
                {field.label}
              </p>
              <p className="text-sm font-medium text-foreground">
                {field.value}
              </p>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full h-11 mt-4 rounded-lg text-foreground"
        >
          <Pencil size={14} className="mr-2" />
          Update Billing Address
        </Button>
      </div>
    </Card>
  );
};

export default BillingInfo;
