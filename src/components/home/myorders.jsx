import React, { useEffect, useState } from "react";
import "../../css/myorder.css";

import { db } from "../../utils/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import ReactPaginate from "react-paginate";

function MyOrder() {

  const [orders, setOrders] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  /* ---------------- PAGINATION ---------------- */

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(orders.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentOrders = orders.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  /* ---------------- LOAD PRODUCTS (FOR IMAGES) ---------------- */

  const loadProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));

    const map = {};

    snapshot.forEach((doc) => {
      map[doc.id] = doc.data();
    });

    setProductsMap(map);
  };

  /* ---------------- FETCH USER ORDERS ---------------- */

  const loadMyOrders = async (userId) => {

    try {

      const q = query(
        collection(db, "orders"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const list = [];

      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      setOrders(list);

    } catch (err) {

      console.log("Order load error:", err);

    } finally {

      setLoading(false);

    }

  };

  /* ---------------- INIT ---------------- */

  useEffect(() => {

    loadProducts(); // 🔥 load all product images

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {
        loadMyOrders(user.uid);
      } else {
        setOrders([]);
        setLoading(false);
      }

    });

    return () => unsubscribe();

  }, []);

  /* ---------------- CALCULATE ORDER TOTAL ---------------- */

  const getOrderTotal = (items) => {

    let total = 0;

    items?.forEach((item) => {
      total += (item.price || 0) * (item.qty || 0);
    });

    return total;

  };

  /* ---------------- UI ---------------- */

  return (

    <section className="salon1-wrapper">

      <h1 className="salon1-title">My Orders</h1>

      {loading && (
        <h3 style={{ textAlign: "center" }}>Loading orders...</h3>
      )}

      {!loading && orders.length === 0 && (
        <h3 style={{ textAlign: "center" }}>
          You have not placed any orders yet.
        </h3>
      )}

      <div className="salon1-grid">

        {currentOrders.map((order) => (

          <div className="salon1-card" key={order.id}>

            <h3 className="salon1-card-title">
              Order #{order.id.substring(0, 6)}
            </h3>

            <div className="order-row">
              <span className="order-label">Date</span>
              <span className="order-value">
                {order.createdAt?.toDate().toLocaleString()}
              </span>
            </div>

            <div className="order-row">
              <span className="order-label">Status</span>
              <span className={`order-status ${order.status?.toLowerCase()}`}>
                {order.status || "Pending"}
              </span>
            </div>

            <hr />

            {/* ORDER ITEMS */}

            {order.items?.map((item, i) => {

              const product = productsMap[item.productId];

              return (
                <div key={i} className="order-item">

                  <img
                    src={product?.imageUrl || "https://via.placeholder.com/60"}
                    alt={item.name}
                    width="60"
                  />

                  <div>
                    <p><b>{item.name}</b></p>
                    <p>₹{item.price} × {item.qty}</p>
                  </div>

                </div>
              );

            })}

            <hr />

            <h3>Total: ₹{getOrderTotal(order.items)}</h3>

          </div>

        ))}

      </div>

      {/* ---------------- PAGINATION ---------------- */}

      {orders.length > itemsPerPage && (

        <div className="pagination-wrapper">

          <ReactPaginate
            previousLabel={"‹"}
            nextLabel={"›"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />

        </div>

      )}

    </section>

  );

}

export default MyOrder;