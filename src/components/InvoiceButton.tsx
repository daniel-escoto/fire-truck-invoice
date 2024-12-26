"use client";

import jsPDF from "jspdf";
import Button from "@/components/Button";

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  amount: number;
  items: { name: string; price: number }[];
}

export default function InvoiceButton() {
  const generatePDF = () => {
    const invoice: InvoiceData = {
      invoiceNumber: "INV-001",
      date: "2024-12-23",
      customerName: "John Doe",
      amount: 1000,
      items: [
        { name: "Fire Truck Repair", price: 600 },
        { name: "Engine Maintenance", price: 400 },
      ],
    };

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Invoice", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 20, 40);
    doc.text(`Date: ${invoice.date}`, 20, 50);
    doc.text(`Customer: ${invoice.customerName}`, 20, 60);
    doc.text(`Amount: $${invoice.amount}`, 20, 70);
    doc.text("Items:", 20, 80);

    let y = 90;
    invoice.items.forEach((item) => {
      doc.text(`- ${item.name}: $${item.price}`, 20, y);
      y += 10;
    });

    doc.text("Thank you for your business!", 105, y + 10, { align: "center" });

    doc.save("invoice.pdf");
  };

  return <Button onClick={generatePDF}>Generate PDF Invoice</Button>;
}
