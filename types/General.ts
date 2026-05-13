export type CustomerType = {
  id: string;
  branchId: string | null;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

type invoiceItems = {
  id: string;
  invoiceId: string;
  itemAmount: string;
  itemQuantity: number;
  itemTitle: string;
  itemTotal: string;
  tax: string;
}

export type InvoiceType = {
  addedBy: string;
  addedByRole: string;
  branchId: string | null;
  companyId: string;
  createdAt: string;
  currency: string;
  customerAddress: string;
  customerEmail: string | null;
  customerName: string;
  customerPhone: string | null;
  date: string;
  discount: string;
  discountName: string | null;
  dueDate: string;
  editedBy: string | null;
  editedByRole: string | null;
  extraCharge: string;
  extraChargeName: string | null;
  id: string;
  invoiceItems: invoiceItems[]
  invoiceName: string;
  invoiceNumber: number;
  note: string | null;
  status: string;
  totalAmount: string;
  totalTaxAmount: string | null;
  updatedAt: string;
}

export type getInvoiceType = {
  id: string;
  invoiceName: string;
  totalAmount: string;
  extraCharge: string;
  extraChargeName: string | null;
  discount: string;
  discountName: string | null;
  paymentTerm: string | null;
  totalTaxAmount: string;
  status: "UNPAID" | "PAID";
  date: string;
  dueDate: string;
  businessName: string;
  email: string;
  phone: string;
  address: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhone: string;
  currency: string;
  invoiceNumber: number
  note: string | null;
  companyId: string;
  branchId: string | null;
  addedBy: string;
  addedByRole: string;
  editedBy: string | null;
  editedByRole: string | null;
  createdAt: string;
  updatedAt: string;
  invoiceItems: invoiceItems[]
}