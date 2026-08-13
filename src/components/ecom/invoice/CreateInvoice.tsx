import { useMemo, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  setInvoiceLocalstorage,
  getInvoiceLocalStorage,
} from "@/ServiceLayer/InvoiceStorage";
import {
  type CreateInvoiceFormData,
  createInvoiceFormSchema,
} from "../../../schema/InvoiceSchema";
import { Plus, Minus, Trash2, Eye, Save, Info } from "lucide-react";
import { Card } from "../../../ui/card";
import { Button } from "../../../ui/button";

const CreateInvoices = () => {
  const [quantity, setQuantity] = useState(1);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [discount, setDiscount] = useState("0%");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateInvoiceFormData>({
    resolver: zodResolver(createInvoiceFormSchema),
    mode: "onChange",
  });

  //fieldarray
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "products",
  });

  //single product total
  const calculateProductTotal = (
    field: CreateInvoiceFormData["products"][number],
  ) => {
    const price = Number(field.currentProductprice);
    const quantity = Number(field.currentProductquantity);
    const discount = Number(field.currentProductdiscount.replace("%", ""));
    const productTotal = price * quantity;
    return productTotal * (1 - discount / 100);
  };
  //all field products total
  const subTotal = useMemo(() => {
    return fields.reduce((total, field) => {
      return total + calculateProductTotal(field);
    }, 0);
  }, [fields]);

  const vat = useMemo(() => {
    return subTotal * 0.1;
  }, [subTotal]);

  //grand total
  const grandTotal = useMemo(() => {
    return subTotal + vat;
  }, [subTotal, vat]);

  //onsubmit
  const onSubmit = (data: CreateInvoiceFormData) => {
    console.log("Invoice submitted:", data);
    const savedInvoices = setInvoiceLocalstorage(data);
    alert("invoice created");
    console.log(savedInvoices);
  };

  const handleSaveProduct = () => {
    if (!productName || !productPrice) {
      return;
    }

    append({
      currentProductname: productName,
      currentProductprice: productPrice,
      currentProductquantity: quantity,
      currentProductdiscount: discount,
    });

    setProductName("");
    setProductPrice("");
    setQuantity(1);
    setDiscount("0%");
  };

  //get localstorage
  useEffect(() => {
    const invoices = getInvoiceLocalStorage();

    console.log(invoices);
  }, []);

  const inputClass =
    "h-12 w-full  rounded-md border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-blue-500 transition-colors";

  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  return (
    <form
      className="flex flex-col gap-5 lg:w-full  "
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log("Validation errors:", errors);
      })}
    >
      <Card className="w-full min-w-0 rounded-2xl border border-border bg-card p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Create Invoice
        </h2>

        {/* top fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Invoice Number</label>
            <input
              type="text"
              placeholder="WP-3434434"
              className={inputClass}
              {...register("invoiceNumber")}
            />
            {errors.invoiceNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.invoiceNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Customer Name</label>
            <input
              type="text"
              placeholder="John Deniyal"
              className={inputClass}
              {...register("customer")}
            />
            {errors.customer && (
              <p className="mt-1 text-sm text-red-500">
                {errors.customer.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className={labelClass}>Customer Address</label>
          <input
            type="text"
            placeholder="Enter customer address"
            className={inputClass}
            {...register("address")}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        <hr className="my-6 border-border" />

        {/* product table */}
        <div className="overflow-x-auto border border-border rounded-2xl">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="text-left bg-muted h-12">
                <th className="px-6 font-medium text-muted-foreground">
                  S. No.
                </th>
                <th className="font-medium text-muted-foreground">Products</th>
                <th className="font-medium text-muted-foreground">Quantity</th>
                <th className="font-medium text-muted-foreground">Unit Cost</th>
                <th className="font-medium text-muted-foreground">Discount</th>
                <th className="font-medium text-muted-foreground">Total</th>
                <th className="w-10" />
              </tr>
            </thead>

            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="border-t border-border h-14">
                  <td className="px-6 text-muted-foreground">{index + 1}</td>
                  <td className="font-semibold text-foreground">
                    {field.currentProductname}
                  </td>
                  <td className="text-muted-foreground">
                    {field.currentProductquantity}
                  </td>
                  <td className="text-blue-500">
                    ${field.currentProductprice}
                  </td>
                  <td className="text-muted-foreground">
                    {field.currentProductdiscount}
                  </td>
                  <td className="text-blue-500">
                    ${calculateProductTotal(field).toFixed(2)}
                  </td>
                  <td className="text-right pr-6">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card className="w-full rounded-md p-0 overflow-hidden mt-6">
          {/* add product row */}
          <div className="p-4 sm:p-6 bg-[#F9FBFA] dark:bg-muted">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-4 items-end">
              <div className="lg:col-span-1">
                <label className={labelClass}>Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Price</label>
                <input
                  type="text"
                  placeholder="Enter product price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Quantity</label>
                <div className="flex items-center h-12 w-full rounded-md border border-border bg-background overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="flex-1 h-full border-r border-border flex justify-center items-center min-w-[44px]"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="flex-1 text-center text-sm text-foreground">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="flex-1 h-full border-l border-border flex justify-center items-center min-w-[44px]"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className={labelClass}>Discount</label>
                <select
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className={inputClass}
                >
                  <option value="0%">0%</option>
                  <option value="5%">5%</option>
                  <option value="10%">10%</option>
                  <option value="20%">20%</option>
                  <option value="50%">50%</option>
                </select>
              </div>

              <Button
                type="button"
                onClick={handleSaveProduct}
                className="h-12 w-full rounded-xl bg-[#475FFF] hover:bg-[#3a4fd9] text-white"
              >
                Save Product
              </Button>
            </div>

            <p className="flex items-start sm:items-center gap-2 mt-4 text-xs text-muted-foreground">
              <Info size={14} className="shrink-0 mt-0.5 sm:mt-0" />
              After filling in the product details, press Enter/Return or click
              'Save Product' to add it to the list.
            </p>
          </div>
        </Card>

        {/* order summary */}
        <div className="flex justify-end mt-6">
          <div className="w-full sm:w-80 rounded-xl bg-card p-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sub Total</span>
              <span className="text-foreground font-medium">
                ${subTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Vat (10%)</span>
              <span className="text-foreground font-medium">
                ${vat.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="text-sm font-semibold text-foreground">
                Total
              </span>
              <span className="text-sm font-bold text-foreground">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <hr className="my-6 border-border" />

        {/* footer actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 py-4 sm:py-8">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full sm:w-auto rounded-xl text-foreground"
          >
            <Eye size={16} className="mr-2" />
            Preview Invoice
          </Button>
          <Button
            type="submit"
            className="h-11 w-full sm:w-auto rounded-xl bg-[#475FFF] hover:bg-[#3a4fd9] text-white"
          >
            <Save size={16} className="mr-2" />
            Save Invoice
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default CreateInvoices;
