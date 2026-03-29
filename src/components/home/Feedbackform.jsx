import React, { useState } from "react";
import "../../css/Feedbackform.css";

import FbIcon from "../../assets/images/facebook2.png";
import FeedbackImg from "../../assets/images/feedbac-10.jpg";

import { db } from "../../utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

function Feedbackform() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [feedback, setFeedback] = useState("");


    const handleSubmit = async () => {

        if (!name || !feedback) {
            toast.error("Please fill all fields", {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
                transition: Bounce
            });
            return;
        }

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            await addDoc(collection(db, "feedbacks"), {
                name: name,
                date: date,
                message: feedback,
                userId: user ? user.uid : null,
                createdAt: serverTimestamp()
            });

            toast.success("Thank you for your feedback!", {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
                transition: Bounce
            });
            setName("");
            setDate("");
            setFeedback("");

        } catch (err) {
            console.log("Feedback error:", err);
        }
    };



    return (
        <section className="fb-page-wrapper">
            <div className="container">
                <div className="row align-items-center">

                    <div className="col-lg-6">
                        <div className="fb-form-box">

                            <div className="fb-icon-circle">
                                <img src={FbIcon} alt="icon" />
                            </div>

                            <h2 className="fb-form-title">Feedback Form</h2>

                            <p className="fb-form-line1">We Value Your Opinion</p>
                            <p className="fb-form-line2">
                                Kindly take a moment to tell us what you think
                            </p>

                            <input type="text" placeholder="Name" className="fb-input" value={name} onChange={(e) => { setName(e.target.value); console.log("Name:", e.target.value); }} />

                            <input
                                type="date"
                                className="fb-input"
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                    console.log("Date:", e.target.value);
                                }}
                            />

                            <textarea
                                placeholder="Your Feedback"
                                className="fb-textarea"
                                value={feedback}
                                onChange={(e) => {
                                    setFeedback(e.target.value);
                                    console.log("Feedback:", e.target.value);
                                }}
                            ></textarea>

                            <div>
                                <button className="fb-submit-btn" onClick={handleSubmit}>
                                    Share My Feedback
                                </button>

                            </div>


                        </div>
                    </div>

                    <div className="col-lg-6 text-center">
                        <img
                            src={FeedbackImg}
                            alt="feedback"
                            className="fb-side-image"
                        />
                    </div>

                </div>
            </div>

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
        </section>
    );
}

export default Feedbackform;
