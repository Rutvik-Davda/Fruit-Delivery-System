import React, { useState } from "react";
import "../../css/faqs.css";

function FAQS() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "Do you ensure the freshness of fruits?",
      a: "Yes, all fruits are sourced fresh on a daily basis from trusted suppliers to maintain superior quality and freshness."
    },
    {
      q: "What is the estimated delivery time after placing an order?",
      a: "Orders are generally delivered within 24 hours, ensuring fruits reach customers at their optimal freshness."
    },
    {
      q: "Are the fruits organically grown?",
      a: "We offer a curated selection of organic and naturally grown fruits, adhering to strict quality and safety standards."
    },
    {
      q: "What should I do if I receive damaged or spoiled fruits?",
      a: "In the rare event of damaged or spoiled fruits, customers may contact our support team to request a replacement or refund."
    },
    {
      q: "Is there a minimum order value?",
      a: "No, there is no minimum order requirement, allowing customers to purchase fruits in any desired quantity."
    },
    {
      q: "Which payment methods are accepted?",
      a: "We accept multiple secure payment options, including Cash on Delivery, UPI, Debit Cards, and Credit Cards."
    },
    {
      q: "Is same-day delivery available?",
      a: "Same-day delivery is available in select service areas, subject to order time and availability."
    },
    {
      q: "Are seasonal fruits available throughout the year?",
      a: "Yes, we regularly update our inventory with fresh seasonal fruits to ensure quality, taste, and nutritional value."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faqs-section">
      <h1 className="faqs-title">FAQS</h1>
      <h2 className="faqs-subtitle"> FAQs on Fruit Buying</h2>

      <div className="faqs-grid">
        {faqs.map((item, index) => (
          <div className="faq-box" key={index}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{item.q}</span>
              <span className="icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                {item.a}    
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQS;
