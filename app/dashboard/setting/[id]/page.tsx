"use client"
import Title from '@/components/Title'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { z } from "zod";
import { toast } from 'react-toastify'
import { axiosClient } from '@/GlobalApi'
import { v4 as uuidv4 } from "uuid";

export const invoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice name is required"),
  currency: z.string().min(1, "Currency is required"),
  date: z.string().min(1, "Invoice date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  billFrom: z.object({
    businessName: z.string().min(1, "Business name is required"),
    email: z.string().email("Invalid business email"),
    address: z.string().min(1, "Address required"),
    phone: z.string().min(5, "Phone number required"),
  }),
  billTo: z.object({
    customerName: z.string().min(1, "Client name required"),
    customerEmail: z.string().email("Invalid client email"),
    customerAddress: z.string().min(1, "Client address required"),
    customerPhone: z.string().min(5, "Client phone required"),
  }),
  invoiceItems: z.array(
    z.object({
      itemTitle: z.string().min(1, "Item name required"),
      itemQuantity: z.number().int().positive("Quantity must be at least 1"),
      itemAmount: z.string()
        .regex(/^\d+(\.\d{1,2})?$/, "Input correct price")
        .transform((val) => parseFloat(val)),
      tax: z
        .number()
        .min(0, "Tax rate must be between 0 and 100")
        .max(100, "Tax rate must be between 0 and 100")
        .default(0)
        .optional(),
    })
  ).min(1, "At least one item required"),
  note: z.string().optional(),
  paymentTerm: z.string().optional(),
  extraChargeName: z.string().optional(),
  extraCharge: z.number().nonnegative("Extra charge cannot be negative").default(0),
  discountName: z.string().optional(),
  discount: z.number().nonnegative("Discount cannot be negative").default(0),
}).refine((data) => {
  // Extra Charge Name required if extraCharge > 0
  if (data.extraCharge > 0) {
    return data.extraChargeName?.trim() !== "";
  }
  return true;
}, {
  message: "Extra charge name is required when extra charge is provided",
  path: ["extraChargeName"],
})
.refine((data) => {
  // Discount Name required if discount > 0
  if (data.discount > 0) {
    return data.discountName?.trim() !== "";
  }
  return true;
}, {
  message: "Discount name is required when discount is provided",
  path: ["discountName"],
});

type invoiceFormValues = z.infer<typeof invoiceSchema>

type itemType = {
  id: string;
  itemTitle: string;
  itemQuantity: string;
  itemAmount: string;
  tax: string;
  itemTotal: number;
}

const page = () => {

  const [currency, setCurrency] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    invoiceName: "",
    date: "",
    due_date: "",
    business_name: "",
    email: "",
    address: "",
    phone: "",
    client_name: "",
    client_email: "",
    client_address: "",
    client_phone: "",
    note: "",
    paymentTerm: "",
    extraChargeName: "",
    extraCharge: "",
    discountName: "",
    discount: "",
  })
  const [items, setItems] = useState([
    { id: uuidv4(), itemTitle: "", itemQuantity: "", itemAmount: "", tax: "", itemTotal: 0 },
  ])
  const [file, setFile] = useState<File | null>(null);
  const [imageInfo, setImageInfo] = useState<{ url: string; temp_id: string } | null>(null)
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (selected: File) => {
        setFile(selected);
        const reader = new FileReader();
        reader.onloadend = () => {
        setPreview(reader.result as string);
        };
        reader.readAsDataURL(selected);
    };

  const handleChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    handleFile(e.dataTransfer.files[0]);
  };

    const handleUpload = async () => {
        if (!file) return;

        try {
            setIsUploading(true)
            const formData = new FormData();
            formData.append("image", file);

            const result = await axiosClient.post("/upload?type=PLAN", formData)
            const imagedata = {
                url: result.data?.data?.attributes?.url,
                temp_id: result.data?.data?.attributes?.temp_id
            }
            // setImageInfo(imagedata)
            setForm((f) => ({ ...f, temp_image_id: imagedata.temp_id }));
            toast.success("Image uploaded!");
        } catch (err: any) {
            toast.error(err.response?.data?.message);
        } finally {
            setIsUploading(false)
        }
    };

  const handleSave = async () => {

    const invoiceItems = items.map((item) => ({
      ...item,
      itemQuantity: Number(item.itemQuantity),
      itemTotal: item.itemTotal.toString(),
      tax: Number(item.tax)
    }));

    const invoiceData = {
      currency,
      invoiceName: form.invoiceName,
      date: form.date,
      dueDate: form.due_date,
      billFrom: {
        businessName: form.business_name || "",
        email: form.email || "",
        address: form.address || "",
        phone: form.phone || "",
      },
      billTo: {
        customerName: form.client_name || "",
        customerEmail: form.client_email || "",
        customerAddress: form.client_address || "",
        customerPhone: form.client_phone || "",
      },
      invoiceItems,
      note: form.note || "",
      paymentTerm: form.paymentTerm || "",
      extraChargeName: form.extraChargeName || "",
      extraCharge: Number(form.extraCharge),
      discountName: form.discountName || "",
      discount: Number(form.discount)
    };

    const result = invoiceSchema.safeParse(invoiceData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof invoiceFormValues, string>> = {};

      result.error.issues.forEach((err) => {
        const field = err.path[err.path.length - 1] as keyof invoiceFormValues;
        fieldErrors[field] = err.message;
      });

      toast.error(Object.values(fieldErrors)[0]);
      return;
    }

    // Save to localStorage
    localStorage.setItem("invoiceForm", JSON.stringify(result.data));

    try {
    
      setIsSubmitting(true)

      const invoiceApiData = {
        currency,
        invoiceName: form.invoiceName,
        date: form.date,
        dueDate: form.due_date,
        businessName: form.business_name || "",
        email: form.email || "",
        address: form.address || "",
        phone: form.phone || "",
        customerName: form.client_name || "",
        customerEmail: form.client_email || "",
        customerAddress: form.client_address || "",
        customerPhone: form.client_phone || "",
        invoiceItems,
        note: form.note || "",
        paymentTerm: form.paymentTerm || "",
        extraChargeName: form.extraChargeName || "",
        extraCharge: Number(form.extraCharge),
        discountName: form.discountName || "",
        discount: Number(form.discount),
        status: "UNPAID",
        subTotal: totals.subtotal,
        totalTaxAmount: totals.taxTotal.toString(),
        totalAmount: (
          totals.grandTotal +
          Number(form.extraCharge || 0) -
          Number(form.discount || 0)
        ).toString()
      };
      
      const result = await axiosClient.post("/staffs/add-invoice", invoiceApiData)

      toast.success(result.data.message);

      setForm({
        invoiceName: "",
        date: "",
        due_date: "",
        business_name: "",
        email: "",
        address: "",
        phone: "",
        client_name: "",
        client_email: "",
        client_address: "",
        client_phone: "",
        note: "",
        paymentTerm: "",
        extraChargeName: "",
        extraCharge: "",
        discountName: "",
        discount: ""
      })
      setItems([
        { id: uuidv4(), itemTitle: "", itemQuantity: "", itemAmount: "", tax: "", itemTotal: 0 },
      ])
      
    } catch (error: any) {
      toast.error(error.response?.data?.message);

    } finally {
      setIsSubmitting(false)
    } 

  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: uuidv4(), itemTitle: "", itemQuantity: "", itemAmount: "", tax: "", itemTotal: 0 },
    ])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleChange = (id: string, field: string, value: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          const qty = parseFloat(updatedItem.itemQuantity) || 0;
          const price = parseFloat(updatedItem.itemAmount) || 0;
          const tax = parseFloat(updatedItem.tax) || 0;
          const subtotal = qty * price;
          const total = subtotal + (subtotal * tax) / 100;
          updatedItem.itemTotal = total;
          return updatedItem;
        }
        return item;
      })
    );
  };

  const calculateTotal = (item: itemType) => {
    const qty = parseFloat(item.itemQuantity) || 0
    const price = parseFloat(item.itemAmount) || 0
    const tax = parseFloat(item.tax) || 0
    const subtotal = qty * price
    const total = subtotal + (subtotal * tax) / 100
    return total
  }

  const totals = items.reduce(
    (acc, item) => {
      const qty = parseFloat(item.itemQuantity) || 0
      const price = parseFloat(item.itemAmount) || 0
      const tax = parseFloat(item.tax) || 0
      const subtotal = qty * price
      const taxAmount = (subtotal * tax) / 100

      acc.subtotal += subtotal
      acc.taxTotal += taxAmount
      acc.grandTotal += subtotal + taxAmount

      return acc
    },
    { subtotal: 0, taxTotal: 0, grandTotal: 0 }
  )

  useEffect(() => {
    const saved = localStorage.getItem("invoiceForm");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrency(parsed.currency || "");
      setForm((prev) => ({
        ...prev,
        date: parsed.date || "",
        due_date: parsed.due_date || "",
        // add billFrom / billTo if needed
      }));
      setItems(parsed.items || []);
    }
  }, []);

  return (
    <div className='my-container'>
      <Title title='Edit Product Info'/>
      <div className='grid gap-6'>
        <Card className="grid grid-cols-1 w-72 gap-4 p-6">
          <div className="space-y-2">
                <Label className='text-accent-foreground'>Upload business logo</Label>

                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50"
                >

                    {/* TOP RIGHT BUTTONS */}
                    {preview && (
                    <div className="absolute top-2 right-2 flex gap-2">
                        <label
                        htmlFor="imageUpload"
                        className="bg-white px-2 py-1 text-xs rounded shadow cursor-pointer"
                        >
                        Change
                        </label>

                        <button
                            onClick={handleUpload}
                            className="bg-green-600 text-white px-2 py-1 text-xs rounded shadow"
                            disabled={isUploading}
                        >
                            {isUploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                    )}

                    {preview ? (
                    <img
                        src={preview}
                        className="mx-auto h-40 object-contain rounded-lg"
                    />
                    ) : (
                    <label htmlFor="imageUpload" className="space-y-2 block">
                        <p className="text-sm text-gray-600">
                        Click to Upload image
                        </p>
                        <p className="text-xs text-gray-400">
                        Max Size ≤ 5MB
                        </p>
                    </label>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChangeLogo}
                        className="hidden"
                        id="imageUpload"
                    />
                </div>
            </div>
        </Card>

        <div className="grid grid-col-1 lg:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <h2 className='font-bold'>Business Info</h2>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Business Name</Label>
                  <Input id="name" value={form.business_name} onChange={(e: any) => setForm({ ...form, business_name: e.target.value})} placeholder="Business name"/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value})} placeholder="email"/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address" className='text-accent-foreground'>Address</Label>
                  <Textarea value={form.address} onChange={(e: any) => setForm({ ...form, address: e.target.value})} placeholder="Enter address here" className='resize-none h-20 scrollbar-rounded' />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Phone</Label>
                  <Input value={form.phone} onChange={(e: any) => setForm({ ...form, phone: e.target.value})} placeholder="e.g +2348345986982"/>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className='font-bold'>Bank Account Info</h2>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="c-name">Account Name</Label>
                  <Input id="c-name" value={form.client_name} onChange={(e: any) => setForm({ ...form, client_name: e.target.value})} placeholder="Account name"/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="c-phone">Account Number</Label>
                  <Input id='c-phone' value={form.client_phone} onChange={(e: any) => setForm({ ...form, client_phone: e.target.value})} placeholder="Account Number"/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="c-email">Bank Name</Label>
                  <Input id="c-email" value={form.client_email} onChange={(e: any) => setForm({ ...form, client_email: e.target.value})} placeholder="Bank name"/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="C-address" className='text-accent-foreground'>Sort Code</Label>
                  <Textarea value={form.client_address} onChange={(e: any) => setForm({ ...form, client_address: e.target.value})} placeholder="Sort code" className='resize-none h-20 scrollbar-rounded' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Button disabled={isSubmitting} type="button" onClick={handleSave}>
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </div>

      </div>

    </div>
  )
}

export default page