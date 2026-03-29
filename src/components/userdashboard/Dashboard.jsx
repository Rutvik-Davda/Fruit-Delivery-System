import React, { useState, useEffect } from "react";
import "../../css/dashboard.css";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


import { useNavigate } from "react-router-dom";
import FruitLineChart from "../../components/userdashboard/FruitLineChart";

import { db, storage } from "../../utils/firebase"
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  doc,
  updateDoc,
  addDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
  where
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";




function Dashboard() {
  const [fruits, setFruits] = useState([
    { id: 1, name: "Apple", price: 120, qty: 5 },
    { id: 2, name: "Banana", price: 60, qty: 1 },
    { id: 3, name: "Orange", price: 80, qty: 4 },
    { id: 4, name: "Pineapple", price: 90, qty: 3 },
    { id: 5, name: "Papaya", price: 70, qty: 6 },
    { id: 6, name: "Watermelon", price: 50, qty: 2 },
    { id: 7, name: "Kiwi", price: 180, qty: 1 },
    { id: 8, name: "Blueberry", price: 220, qty: 2 },
    { id: 9, name: "Pomegranate", price: 160, qty: 4 },
    { id: 10, name: "Avocado", price: 200, qty: 3 },
    { id: 11, name: "Strawberry", price: 140, qty: 5 },
    { id: 12, name: "Cherry", price: 260, qty: 2 },
    { id: 13, name: "Pear", price: 100, qty: 3 },
    { id: 14, name: "Grapes", price: 90, qty: 6 },
    { id: 15, name: "Litchi", price: 90, qty: 4 },
  ]);

  const monthlyFruitSales = [
    { month: "Jan", sales: 25000 },
    { month: "Feb", sales: 28000 },
    { month: "Mar", sales: 42000 },
    { month: "Apr", sales: 32000 },
    { month: "May", sales: 35000 },
    { month: "Jun", sales: 24000 },
    { month: "Jul", sales: 40000 },
    { month: "Aug", sales: 58000 },
    { month: "Sep", sales: 32000 },
    { month: "Oct", sales: 42000 },
    { month: "Nov", sales: 37000 },
    { month: "Dec", sales: 39000 },
  ];

  const inventoryData = [
    { id: 1, name: "Apple", price: 120, stock: 40, status: "In Stock" },
    { id: 2, name: "Banana", price: 60, stock: 8, status: "Low Stock" },
    { id: 3, name: "Orange", price: 80, stock: 25, status: "In Stock" },
    { id: 4, name: "Pineapple", price: 90, stock: 0, status: "Out of Stock" },
    { id: 5, name: "Papaya", price: 70, stock: 12, status: "In Stock" },
    { id: 6, name: "Watermelon", price: 50, stock: 3, status: "Low Stock" },
    { id: 7, name: "Kiwi", price: 180, stock: 6, status: "Low Stock" },
    { id: 8, name: "Blueberry", price: 220, stock: 0, status: "Out of Stock" },
    { id: 9, name: "Pomegranate", price: 160, stock: 18, status: "In Stock" },
    { id: 10, name: "Avocado", price: 200, stock: 4, status: "Low Stock" },
    { id: 11, name: "Strawberry", price: 140, stock: 20, status: "In Stock" },
    { id: 12, name: "Cherry", price: 260, stock: 0, status: "Out of Stock" },
    { id: 13, name: "Pear", price: 100, stock: 15, status: "In Stock" },
    { id: 14, name: "Grapes", price: 90, stock: 9, status: "Low Stock" },
    { id: 15, name: "Litchi", price: 90, stock: 22, status: "In Stock" },
  ];

  
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const [active, setActive] = useState("Dashboard");
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [lastDoc, setLastDoc] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [products, setProducts] = useState([]);
  const [pname, setPname] = useState("");
  const [pprice, setPprice] = useState("");
  const [pimage, setPimage] = useState(null);
  const [editProductId, setEditProductId] = useState(null);

  const [feedbacks, setFeedbacks] = useState([]);




  const fetchFeedbacks = async () => {
    const snapshot = await getDocs(collection(db, "feedbacks"));
    const list = [];

    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    setFeedbacks(list);
  };


 const loadDashboardStats = async () => {
  try {

    // USERS
    const usersSnap = await getDocs(collection(db, "users"));
    setTotalUsers(usersSnap.size);

    // PRODUCTS
    const productsSnap = await getDocs(collection(db, "products"));
    setTotalProducts(productsSnap.size);

    // ORDERS + TOTAL AMOUNT
    const ordersSnap = await getDocs(collection(db, "orders"));
    setTotalOrdersCount(ordersSnap.size);

    let revenue = 0;

    ordersSnap.forEach((doc) => {
      const order = doc.data();

      if (order.items && Array.isArray(order.items)) {
        order.items.forEach((item) => {
          revenue += (item.price || 0) * (item.qty || 0);
        });
      }
    });

    setTotalRevenue(revenue);

  } catch (err) {
    console.log("Dashboard stats error:", err);
  }
};

  useEffect(() => {
    if (active === "Dashboard") {
      loadDashboardStats();
    }
  }, [active]);

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

  });
};
 const fetchProducts = async () => {

  const snapshot = await getDocs(collection(db, "products"));

  const list = [];

  snapshot.forEach((doc) => {
    list.push({ id: doc.id, ...doc.data() });
  });

  setProducts(list);
};

  useEffect(() => {
    fetchProducts();
  }, []);


 const handleProductSubmit = async (e) => {

  e.preventDefault();

  let imageUrl = "";

  try {

    // convert image to Base64
    if (pimage) {
      imageUrl = await convertToBase64(pimage);
    }

    if (editProductId) {

      await updateDoc(doc(db, "products", editProductId), {
        name: pname,
        price: Number(pprice),
        ...(imageUrl && { imageUrl })
      });

      setEditProductId(null);

    } else {

      await addDoc(collection(db, "products"), {
        name: pname,
        price: Number(pprice),
        imageUrl: imageUrl,
        createdAt: serverTimestamp()
      });

    }

    // reset form
    setPname("");
    setPprice("");
    setPimage(null);

    fetchProducts();

  } catch (err) {

    console.log("Product upload error:", err);

  }

};

  const deleteProduct = async (id) => {

  await deleteDoc(doc(db, "products", id));

  fetchProducts();

};

  const editProduct = (product) => {

  setPname(product.name);
  setPprice(product.price);
  setEditProductId(product.id);

};


 const renderProducts = () => {

  return (

    <>
      <h2 className="sections-title">Product Management</h2>

      <form className="product-form" onSubmit={handleProductSubmit}>

        <input
          type="text"
          placeholder="Fruit Name"
          value={pname}
          onChange={(e) => setPname(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={pprice}
          onChange={(e) => setPprice(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPimage(e.target.files[0])}
        />

        <button className="status-btn">
          {editProductId ? "Update Product" : "Add Product"}
        </button>

      </form>


      <div className="inventory-table-wrapper">

        <table className="inventory-table">

          <thead>
            <tr>
              <th>Image</th>
              <th>Fruit</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {products.map((p) => (

              <tr key={p.id}>

                <td>
                  <img
                    src={p.imageUrl}
                    alt=""
                    width="60"
                    style={{ borderRadius: "6px" }}
                  />
                </td>

                <td>{p.name}</td>

                <td>₹{p.price}</td>

                <td>

                  <button
                    className="status-btn"
                    onClick={() => editProduct(p)}
                  >
                    Edit
                  </button>

                  &nbsp;

                  <button
                    className="status-btn"
                    onClick={() => deleteProduct(p.id)}
                    style={{ background: "#e53935" }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>
  );
};


  const fetchOrders = async (next = false) => {

    setLoadingOrders(true);

    let q;

    if (next && lastDoc) {
      q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(10)
      );
    } else {
      q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc"),
        limit(10)
      );
    }

    const snapshot = await getDocs(q);

    const list = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    setOrders(list);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    setLoadingOrders(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {

    const orders = Number(localStorage.getItem("cartvalue")) || 0;
    setTotalOrders(orders);


    let sales = 0;

    fruits.forEach((fruit) => {
      const qty = Number(localStorage.getItem("cart_" + fruit.id)) || 0;
      sales += qty * fruit.price;
    });

    setTotalSales(sales);
  }, [fruits]);

  const changeStatus = async (id, newStatus) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, { status: newStatus });


      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );

    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const list = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setUsers(list);
  };

  const deleteUserAccount = async (userId) => {

    const confirmDelete = window.confirm("Delete this user and all their orders?");
    if (!confirmDelete) return;

    try {


      const q = query(collection(db, "orders"), where("userId", "==", userId));
      const orderSnap = await getDocs(q);

      const deletePromises = [];
      orderSnap.forEach((orderDoc) => {
        deletePromises.push(deleteDoc(doc(db, "orders", orderDoc.id)));
      });
      await Promise.all(deletePromises);


      await deleteDoc(doc(db, "users", userId));


      fetchUsers();

    } catch (err) {
      console.log("Delete user error:", err);
    }
  };
// 
  const renderUsers = () => {
    return (
      <>
        <h2 className="sections-title">Registered Users</h2>

        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Joined Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id.substring(0, 8)}</td>
                  <td>{u.email}</td>
                  <td>{u.createdAt?.toDate().toLocaleDateString()}</td>

                  <td>
                    <button
                      className="status-btn"
                      style={{ background: "#e53935" }}
                      onClick={() => deleteUserAccount(u.id)}
                    >
                      Delete User
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

// 
  const renderOrders = () => {
    return (
      <>
        <h2 className="sections-title">Customer Orders</h2>

        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total (₹)</th>
                <th>Order Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const total = order.items?.reduce(
                  (sum, item) => sum + item.price * item.qty,
                  0
                );

                return (
                  <tr key={order.id}>
                    <td>{order.id.substring(0, 6)}</td>

                    <td>
                      {order.items?.map((item, i) => (
                        <div key={i}>
                          {item.name} (x{item.qty})
                        </div>
                      ))}
                    </td>

                    <td>₹{total}</td>

                    <td>
                      {order.createdAt?.toDate().toLocaleString()}
                    </td>

                    <td>{order.status}</td>

                    <td>
                      <select
                        value={order.status || "Pending"}
                        onChange={(e) => changeStatus(order.id, e.target.value)}
                        className="order-status-dropdown"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        className="status-btn"
                        onClick={() => setSelectedOrder(order)}
                        style={{ marginLeft: "8px" }}
                      >
                        View
                      </button>


                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ marginTop: "20px", textAlign: "center" }}>

            <button
              className="status-btn"
              onClick={() => fetchOrders()}
              style={{ marginRight: "10px" }}
            >
              Refresh
            </button>

            <button
              className="status-btn"
              onClick={() => fetchOrders(true)}
            >
              Next Page →
            </button>

          </div>

        </div>
      </>
    );
  };
  const renderOrderModal = () => {
    if (!selectedOrder) return null;

    const total = selectedOrder.items?.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    return (
      <div className="order-modal-overlay">
        <div className="order-modal">

          <h2>Order Details</h2>

          <p><b>Order ID:</b> {selectedOrder.id}</p>
          <p><b>User ID:</b> {selectedOrder.userId}</p>
          <p><b>Order Time:</b> {selectedOrder.createdAt?.toDate().toLocaleString()}</p>
          <p><b>Status:</b> {selectedOrder.status}</p>

          <hr />

          <h3>Items</h3>

          {selectedOrder.items?.map((item, i) => (
            <div key={i} className="order-item-row">
              <img src={item.image} alt="" width="60" />
              <div>
                <p><b>{item.name}</b></p>
                <p>₹{item.price} × {item.qty}</p>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button
            className="status-btn"
            onClick={() => setSelectedOrder(null)}
          >
            Close
          </button>

        </div>
      </div>
    );
  };


  const renderInventory = () => {
    return (
      <>
        <h2 className="sections-title"> Fruit Inventory</h2>

        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>


                <th>Fruit Name</th>
                <th>Price (₹)</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {inventoryData.map((item) => (
                <tr key={item.id}>


                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.stock}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </>
    );
  };

const deleteFeedback = async (feedbackId) => {

  toast.info("Are you sure you want to delete this feedback?", {
    position: "top-center",
    autoClose: 2000,
    theme: "colored",
    transition: Bounce
  });

  const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
  if (!confirmDelete) return;

  try {

    await deleteDoc(doc(db, "feedbacks", feedbackId));

    setFeedbacks((prev) => prev.filter((f) => f.id !== feedbackId));

    toast.success("Feedback deleted successfully", {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
      transition: Bounce
    });

  } catch (err) {

    console.log("Delete feedback error:", err);

    toast.error("Error deleting feedback", {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
      transition: Bounce
    });

  }
};

 const renderFeedbacks = () => {
  return (
    <>
      <h2 className="sections-title">User Feedback</h2>

      <div className="inventory-table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.map((f) => (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td>{f.date}</td>
                <td style={{ maxWidth: "300px" }}>{f.message}</td>

                <td>
                  <button
                    className="status-btn"
                    style={{ background: "#e53935" }}
                    onClick={() => deleteFeedback(f.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

<ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  transition={Bounce}
/>
      </div>
    </>
  );
};


  const renderCenter = () => {


    useEffect(() => {
      if (active === "Feedback") {
        fetchFeedbacks();
      }
    }, [active]);


    useEffect(() => {
      if (active === "Customers") {
        fetchUsers();
      }
    }, [active]);


    if (active === "Inventory") {
      return renderInventory();
    }

    if (active === "Orders") {
      return renderOrders();
    }

    if (active === "Products") {
      return renderProducts();

    }

    if (active === "Customers") {
      return renderUsers();
    }

    if (active === "Feedback") {
      return renderFeedbacks();
    }


    return (
      <>
        <div className="dashboard-hero">
          <h1>Customer Support Dashboard.</h1>
          <p>
            Discover different analytics and reports about Customer Support.
          </p>
        </div>



        <div className="dashboard-cards">

          <div className="dash-card card-1">
            <span>Total Users</span>
            <h2>{totalUsers}</h2>
          </div>

          <div className="dash-card card-2">
            <span>Total Orders</span>
            <h2>{totalOrdersCount}</h2>
          </div>

          <div className="dash-card card-3">
            <span>Total Products</span>
            <h2>{totalProducts}</h2>
          </div>
<div className="dash-card card-1">
  <span>Total Revenue</span>
  <h2>₹{totalRevenue}</h2>
</div>
        </div>





        <div className="dashboard-graph-wrapper">
          <h2 className="graph-title">Fruit Analytics</h2>

          <div className="dashboard-graph">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={fruits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="qty" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <FruitLineChart data={monthlyFruitSales} />
  
      </>
    );
  };

  return (
    <div className="dashboard-scope">
      <div className="dashboard-container">


        <aside className="dashboard-sidebar">
          <div className="dashboard-logo">Fruit Mart</div>

          <ul className="dashboard-menu">
            {["Dashboard", "Products", "Inventory", "Orders", "Customers", "Feedback", "Settings"]

              .map(
                (item) => (
                  <li
                    key={item}
                    className={active === item ? "active" : ""}
                    onClick={() => setActive(item)}
                  >
                    {item}
                  </li>
                )
              )}
          </ul>

          <button
            className="dashboard-logout"
            onClick={() => navigate("/")}
          >
            Log Out
          </button>
        </aside>

        <main className="dashboard-main">

          <div className="dashboard-top">
            <div className="dashboard-search">
              <input type="text" placeholder="Search..." />
              <button className="search-btn">Search</button>
            </div>

            <span className="welcome-badge">Welcome Admin</span>

          </div>

          {renderCenter()}
          {renderOrderModal()}
        </main>


      </div>

    </div>
  );
}

export default Dashboard;



