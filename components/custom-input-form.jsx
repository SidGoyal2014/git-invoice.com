import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function CustomInputFormComponent({
  session,
  onFormChange,
  recordedHours,
}) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState(session?.email || "");
  const [paymentType, setPaymentType] = useState("bank transfer");
  const [costPerHour, setCostPerHour] = useState(100);
  const [isOneTimePayment, setIsOneTimePayment] = useState(false);
  const [oneTimeAmount, setOneTimeAmount] = useState(0);
  const [editableName, setEditableName] = useState(session?.user?.name || "");
  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber());
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [paymentDetails, setPaymentDetails] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [currency, setCurrency] = useState("EUR");
  const [clientNotes, setClientNotes] = useState("");

  const handleChange = (field, value) => {
    const setters = {
      clientName: setClientName,
      clientEmail: setClientEmail,
      paymentType: setPaymentType,
      costPerHour: setCostPerHour,
      isOneTimePayment: setIsOneTimePayment,
      oneTimeAmount: setOneTimeAmount,
      editableName: setEditableName,
      invoiceDate: setInvoiceDate,
      dueDate: setDueDate,
      paymentDetails: setPaymentDetails,
      taxRate: setTaxRate,
      discount: setDiscount,
      currency: setCurrency,
      clientNotes: setClientNotes,
    };

    setters[field](value);

    onFormChange({
      clientName,
      clientEmail,
      paymentType,
      costPerHour,
      isOneTimePayment,
      oneTimeAmount,
      editableName,
      invoiceNumber,
      invoiceDate,
      dueDate,
      paymentDetails,
      taxRate,
      discount,
      currency,
      clientNotes,
      [field]: value,
    });
  };

  function generateInvoiceNumber() {
    const now = new Date();
    return `INV-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}-${Math.floor(
      Math.random() * 1000,
    )
      .toString()
      .padStart(3, "0")}`;
  }

  function calculateTotal() {
    const baseAmount = isOneTimePayment
      ? oneTimeAmount
      : recordedHours * costPerHour;
    const totalWithDiscount = baseAmount - discount;
    const totalWithTax =
      totalWithDiscount + totalWithDiscount * (taxRate / 100);
    return totalWithTax.toFixed(2);
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => handleChange("clientName", e.target.value)}
                placeholder="Enter client name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email (Optional)</Label>
              <Input
                id="clientEmail"
                type="email"
                value={clientEmail}
                onChange={(e) => handleChange("clientEmail", e.target.value)}
                placeholder="Enter client email"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentDetails">Payment Details</Label>
              <Textarea
                id="paymentDetails"
                value={paymentDetails}
                onChange={(e) => handleChange("paymentDetails", e.target.value)}
                placeholder="Enter payment instructions"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isOneTimePayment">One-Time Payment</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isOneTimePayment"
                  checked={isOneTimePayment}
                  onCheckedChange={(value) =>
                    handleChange("isOneTimePayment", value)
                  }
                />
                <span>{isOneTimePayment ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
          {isOneTimePayment ? (
            <div className="space-y-2">
              <Label htmlFor="oneTimeAmount">One-Time Amount</Label>
              <Input
                id="oneTimeAmount"
                type="number"
                value={oneTimeAmount}
                onChange={(e) =>
                  handleChange("oneTimeAmount", Number(e.target.value))
                }
                placeholder="Enter one-time amount"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="costPerHour">Cost per Hour</Label>
              <Input
                id="costPerHour"
                type="number"
                value={costPerHour}
                onChange={(e) =>
                  handleChange("costPerHour", Number(e.target.value))
                }
                placeholder="Enter hourly rate"
              />
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input id="invoiceNumber" value={invoiceNumber} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => handleChange("dueDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={taxRate}
                onChange={(e) =>
                  handleChange("taxRate", Number(e.target.value))
                }
                placeholder="Enter tax rate"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Discount</Label>
              <Input
                id="discount"
                type="number"
                value={discount}
                onChange={(e) =>
                  handleChange("discount", Number(e.target.value))
                }
                placeholder="Enter discount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={currency}
                onValueChange={(value) => handleChange("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                  <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientNotes">Client Notes</Label>
            <Textarea
              id="clientNotes"
              value={clientNotes}
              onChange={(e) => handleChange("clientNotes", e.target.value)}
              placeholder="Enter additional notes for the client"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
