import React, { useEffect, useState } from "react";
import "../../css/FeedbackReply.css";

import { db } from "../../utils/firebase"
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs
} from "firebase/firestore";

function FeedbackReply() {

  // ---------------- STATES ----------------
  const [feedbacks, setFeedbacks] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  // ---------------- FETCH FEEDBACKS ----------------
  const fetchFeedbacks = async (next = false) => {
    try {
      setLoading(true);

      let q;

      // next page
      if (next && lastDoc) {
        q = query(
          collection(db, "feedbacks"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(6)
        );
      } 
      // first page / refresh
      else {
        q = query(
          collection(db, "feedbacks"),
          orderBy("createdAt", "desc"),
          limit(6)
        );
      }

      const snapshot = await getDocs(q);

      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      setFeedbacks(list);

      // pagination tracking
      setFirstDoc(snapshot.docs[0] || null);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === 6);

    } catch (err) {
      console.log("Feedback load error:", err);
    } finally {
      setLoading(false);
    }
  };


  // ---------------- LOAD FIRST TIME ----------------
  useEffect(() => {
    fetchFeedbacks();
  }, []);


  // ---------------- UI ----------------
  return (
    <div className="fb-reply-page-wrapper">
      <div className="fb-reply-parent-card">

        <div className="fb-reply-grid">

          {feedbacks.length === 0 && (
            <h3 style={{ textAlign: "center", width: "100%" }}>
              No feedback yet.
            </h3>
          )}

          {feedbacks.map((fb) => (
            <div className="fb-reply-child-card" key={fb.id}>

              <h3>{fb.name || "Anonymous User"}</h3>

              <p>
                {fb.message}
                <br />

                <small style={{ color: "#777" }}>
                  {fb.createdAt
                    ? fb.createdAt.toDate().toLocaleDateString()
                    : ""}
                </small>
              </p>

            </div>
          ))}

        </div>


        {/* -------- Pagination Controls -------- */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>

          <button
            className="status-btn"
            onClick={() => fetchFeedbacks()}
            style={{ marginRight: "10px" }}
            disabled={loading}
          >
            Refresh
          </button>

          <button
            className="status-btn"
            onClick={() => fetchFeedbacks(true)}
            disabled={!hasMore || loading}
          >
            {loading ? "Loading..." : "Next →"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default FeedbackReply;