import { type CreateInvoiceFormData } from "@/schema/InvoiceSchema";

export const setInvoiceLocalstorage = (invoice: CreateInvoiceFormData) => {
  const existingInvoices: CreateInvoiceFormData[] = JSON.parse(
    localStorage.getItem("Tailadmininvoice") || "[]",
  );

  const updatedInvoices = [...existingInvoices, invoice];

  localStorage.setItem("Tailadmininvoice", JSON.stringify(updatedInvoices));
  return updatedInvoices;
};

export const getInvoiceLocalStorage = (): CreateInvoiceFormData[] => {
  const invoices = localStorage.getItem("Tailadmininvoice");

  if (!invoices) {
    return [];
  }

  return JSON.parse(invoices);
};
