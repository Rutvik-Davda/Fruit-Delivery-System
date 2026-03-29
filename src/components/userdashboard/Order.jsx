import React, { useEffect, useState } from "react";
import {db} from "../../utils/firebase"
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
  query
} from "firebase/firestore";

function Order() {
  const [orders, setOrders] = useState([]);

  // FETCH ORDERS (Realtime)
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setOrders(list);
    });

    return () => unsub();
  }, []);

  // CHANGE STATUS FUNCTION
  const changeStatus = async (id, currentStatus) => {
    let newStatus;

    switch (currentStatus) {
      case "Pending":
        newStatus = "Accepted";
        break;
      case "Accepted":
        newStatus = "Preparing";
        break;
      case "Preparing":
        newStatus = "Out for Delivery";
        break;
      default:
        newStatus = "Delivered";
    }

    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, { status: newStatus });
  };

  // CALCULATE TOTAL
  const calculateTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.qty;
    });
    return total;
  };

  return (
    <div style={{ padding: "20px", background: "#f4f6f8", minHeight: "100vh" }}>
      <h2>Restaurant Orders</h2>

      {orders.length === 0 && <p>No Orders Yet...</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            background: "white",
            padding: "18px",
            marginBottom: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          {/* Order Header */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Order ID: {order.id.substring(0,6)}</h3>
            <span><b>Status:</b> {order.status}</span>
          </div>

          <p>
            <b>Order Time:</b>{" "}
            {order.createdAt?.toDate().toLocaleString()}
          </p>

          <hr />

          {/* Items */}
          <h4>Items:</h4>

          {order.items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                gap: "15px"
              }}
            >
              <img
                src={`/images/${item.image}`}
                alt={item.name}
                width="60"
                height="60"
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />

              <div>
                <p><b>{item.name}</b></p>
                <p>₹{item.price} × {item.qty}</p>
              </div>
            </div>
          ))}

          <hr />

          <h3>Total: ₹{calculateTotal(order.items)}</h3>

          <button
            onClick={() => changeStatus(order.id, order.status)}
            style={{
              marginTop: "10px",
              background: "#28a745",
              color: "white",
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Update Status
          </button>
        </div>
      ))}
    </div>
  );
}

export default Order;
