import React, { useEffect, useState } from "react";
import removeIcon from "../../assets/images/remove3.png";
import "../../css/Fruittable.css";
import { useNavigate } from "react-router-dom";

import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { getAuth } from "firebase/auth";

import ReactPaginate from "react-paginate";

const Fruittable = () => {

  const navigate = useNavigate();
  const auth = getAuth();

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  /* ---------------- LOAD PRODUCTS FROM FIRESTORE ---------------- */

  useEffect(() => {

    const loadProducts = async () => {

      const snapshot = await getDocs(collection(db, "products"));

      const list = [];

      snapshot.forEach((doc) => {

        const data = doc.data();

        list.push({
          id: doc.id,
          name: data.name,
          price: data.price,
          image: data.imageUrl
        });

      });

      setProducts(list);

    };

    loadProducts();

  }, []);


  /* ---------------- BUILD CART FROM LOCALSTORAGE ---------------- */

  useEffect(() => {

    if (products.length === 0) return;

    const data = products
      .map((p) => {

        const qty = Number(localStorage.getItem("cart_" + p.id));

        return qty > 0 ? { ...p, qty } : null;

      })
      .filter(Boolean);

    setCart(data);

  }, [products]);


  /* ---------------- REMOVE ITEM ---------------- */

  const removeItem = (id) => {

    localStorage.removeItem("cart_" + id);

    const updated = cart.filter((i) => i.id !== id);

    setCart(updated);

    const totalQty = updated.reduce((s, i) => s + i.qty, 0);

    localStorage.setItem("cartvalue", totalQty);

    window.dispatchEvent(new Event("cartUpdated"));

  };


  /* ---------------- CART TOTAL ---------------- */

  const subTotal = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );


  /* ---------------- SAVE ORDER ---------------- */

  // const saveOrderToDatabase = async () => {

  //   try {

  //     if (!auth.currentUser) {
  //       alert("Please login first");
  //       return;
  //     }

  //     if (cart.length === 0) {
  //       alert("Cart is empty");
  //       return;
  //     }

  //     const orderData = {
  //       userId: auth.currentUser.uid,
  //       items: cart.map((item) => ({
  //         id: item.id,
  //         name: item.name,
  //         price: item.price,
  //         qty: item.qty,
  //         image: item.image
  //       })),
  //       subTotal: subTotal,
  //       status: "Pending",
  //       paymentStatus: "success",
  //       createdAt: serverTimestamp()
  //     };

  //     await addDoc(collection(db, "orders"), orderData);

  //     console.log("Order saved successfully ✅");

  //     navigate("/userdashboard/payment");

  //   } catch (error) {

  //     console.error("Error saving order ", error);

  //   }

  // };


  /* ---------------- PAGINATION ---------------- */

  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(cart.length / itemsPerPage);

  const offset = currentPage * itemsPerPage;

  const currentItems = cart.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };


  /* ---------------- UI ---------------- */

  return (

    <div className="fruit-table-page">

      <h2 className="fruit-table-title">Fresh Fruit Orders Details</h2>

      <table className="fruit-table">

        <thead>
          <tr>
            <th>Items</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>

          {currentItems.map((item) => (

            <tr key={item.id}>

              <td>
                <img
                  src={item.image}
                  className="fruit-table-img"
                  alt={item.name}
                />
              </td>

              <td>{item.name}</td>

              <td>₹ {item.price}</td>

              <td>{item.qty}</td>

              <td>₹ {item.price * item.qty}</td>

              <td>
                <img
                  src={removeIcon}
                  className="remove-icon"
                  onClick={() => removeItem(item.id)}
                  alt="remove"
                />
              </td>

            </tr>

          ))}

        </tbody>

      </table>


      {/* Pagination */}

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


      {/* Cart Totals */}

      <h3 style={{ marginTop: "25px" }}>Cart Totals</h3>

      <table className="cart-total-table">

        <tbody>

          <tr>
            <td>Subtotal</td>
            <td>₹ {subTotal}</td>
          </tr>

          <tr>
            <td><b>Total</b></td>
            <td><b>₹ {subTotal}</b></td>
          </tr>

        </tbody>

      </table>


     <button
  className="payment-btn"
  onClick={() => navigate("/userdashboard/payment")}
>
  Proceed to Payment
</button>

    </div>

  );

};

export default Fruittable;