import React, { useEffect, useState } from "react";
import video1 from "../../assets/images/video1.mp4";
import "../../css/Sucessdata.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { db } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const Sucessdata = () => {

  const [order, setOrder] = useState(null);

  const location = useLocation();
  const orderId = location.state?.orderId;
console.log("Order ID:", orderId);
  /* -------- LOAD ORDER -------- */

  useEffect(() => {

    const loadOrder = async () => {

      if (!orderId) return;

      const orderRef = doc(db, "orders", orderId);
      const snapshot = await getDoc(orderRef);

      if (snapshot.exists()) {
        setOrder(snapshot.data());
      }

    };

    loadOrder();

  }, [orderId]);


  /* -------- DOWNLOAD RECEIPT -------- */

  const downloadPDF = () => {

    if (!order) {
      alert("Order not loaded yet");
      return;
    }

    const docPDF = new jsPDF("p", "mm", "a4");

    docPDF.setFontSize(20);
    docPDF.setFont("helvetica", "bold");
    docPDF.text("Fruit Order Receipt", 14, 20);

    docPDF.setFont("helvetica", "normal");

    let tableData = [];
    let totalAmount = 0;

    order.items.forEach((item) => {

      const rowTotal = item.qty * item.price;

      totalAmount += rowTotal;

      tableData.push([
        item.name,
        item.qty,
        item.price,
        rowTotal
      ]);

    });

    autoTable(docPDF, {
      startY: 30,
      head: [["Fruit Name", "Quantity", "Price", "Total"]],
      body: tableData,

      theme: "grid",

      styles: {
        fontSize: 11,
        halign: "center",
        valign: "middle",
        cellPadding: 6
      },

      headStyles: {
        fillColor: [34, 197, 94],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 12
      },

      columnStyles: {
        0: { halign: "left" },
        1: { halign: "center" },
        2: { halign: "right" },
        3: { halign: "right" }
      }
    });

    const finalY = docPDF.lastAutoTable.finalY + 12;

    docPDF.setFontSize(14);
    docPDF.setFont("helvetica", "bold");
    docPDF.text(`Total : ${totalAmount}`, 14, finalY);

    docPDF.save("Fruit_Order_Receipt.pdf");

  };


  return (
    <div className="success-page">

      <div className="success-box">

        <video
          src={video1}
          autoPlay
          loop
          muted
          className="success-video"
        />

        <h2 className="success-title">Payment Successful!</h2>

        <p className="success-text">Thank you for your purchase.</p>

        <p className="success-text">
          Your order has been placed successfully.
        </p>

        <p className="success-text">
          Congratulations, your payment has been processed successfully.
        </p>

        <button
          className="success-download-btn"
          onClick={downloadPDF}
        >
          Download Receipt
        </button>

      </div>

    </div>
  );
};

export default Sucessdata;