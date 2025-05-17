import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const invoiceData = {
    invoiceNo: "INV-2025-001",
    date: new Date().toLocaleDateString("en-GB"),
    customer: {
      name: "Rohit Mehta",
      email: "rohit@example.com",
      address: "221B Baker Street, Mumbai, India",
    },
    items: [
      { name: "T-shirt - Black (M)", qty: 2, price: 599 },
      { name: "Hoodie - Grey (L)", qty: 1, price: 1299 },
      { name: "Cap - Red", qty: 1, price: 299 },
    ],
  };

  const total = invoiceData.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const handleDownload = async () => {
    const invoiceElement = document.getElementById("invoice-content");
    const canvas = await html2canvas(invoiceElement, {
      useCORS: true,
      backgroundColor: "#fff", // ensure white background
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`${invoiceData.invoiceNo}.pdf`);
  };

  return (
    <div style={{
      padding: "1.5rem",
      maxWidth: "700px",
      margin: "2rem auto",
      background: "#fff",
      borderRadius: "0.75rem",
      boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)"
    }}>
      {/* Download Button */}
      <div style={{ display: "flex", justifyContent: "end", marginBottom: "1rem" }}>
        <button
          onClick={handleDownload}
          className=''
          style={{
            backgroundColor: "#e11d48", // rose-600 fallback
            color: "#fff",
            padding: "0.5rem 1.25rem",
            borderRadius: "0.5rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer"
          }}
        >
          Download Invoice
        </button>
      </div>

      {/* Invoice Content */}
      <div
        id="invoice-content"
        style={{
          background: "#fff",
          padding: "1.5rem",
          border: "1px solid #d1d5db",
          borderRadius: "0.5rem",
          color: "#111827"
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "0.25rem",
              color: "#b91c1c",
              // fontFamily:'Poppins'

            }}
           
          >
            INVOICE
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#6b7280" }}>Invoice No: {invoiceData.invoiceNo}</p>
          <p style={{ fontSize: "0.95rem", color: "#6b7280" }}>Date: {invoiceData.date}</p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#111827" }}>Billed To:</h2>
          <p>{invoiceData.customer.name}</p>
          <p>{invoiceData.customer.email}</p>
          <p>{invoiceData.customer.address}</p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#fee2e2", color: "#000" }}>
                <th style={{ padding: "0.5rem", border: "1px solid #d1d5db" }}>Item</th>
                <th style={{ padding: "0.5rem", border: "1px solid #d1d5db" }}>Quantity</th>
                <th style={{ padding: "0.5rem", border: "1px solid #d1d5db" }}>Price</th>
                <th style={{ padding: "0.5rem", border: "1px solid #d1d5db" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: "0.5rem", border: "1px solid #d1d5db" }}>{item.name}</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #d1d5db" }}>{item.qty}</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #d1d5db" }}>₹{item.price}</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #d1d5db" }}>₹{item.qty * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", justifyContent: "end", marginTop: "1.5rem" }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "1.2rem", fontWeight: 600, color: "#111827" }}>Total: ₹{total}</p>
            <p style={{ fontSize: "0.95rem", color: "#6b7280" }}>Thank you for shopping with us!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;