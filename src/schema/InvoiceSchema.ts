import { z } from "zod";

export const invoiceProductSchema = z.object({
  currentProductname: z.string().min(1, "Product name is required"),
  currentProductprice: z.string().min(1, "Product price is required"),
  currentProductquantity: z.number().positive(),
  currentProductdiscount: z.string(),
});

export const createInvoiceFormSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  customer: z.string().min(1, "Customer name is required"),
  address: z.string().min(10, "Address must contain at least 10 characters"),

  products: z.array(invoiceProductSchema).min(1, "Add at least one product"),
});

export type CreateInvoiceFormData = z.infer<typeof createInvoiceFormSchema>;
