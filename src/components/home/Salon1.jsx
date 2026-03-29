import React from "react";
import "../../css/Salon1.css";

function Salon1() {

  const fruits = [
    { title: "Apple", text: "Apple at FruitSalon is carefully selected to ensure crisp texture, natural sweetness, and rich fiber content that supports daily health and digestion." },
    { title: "Banana", text: "Banana at FruitSalon provides instant energy and potassium, supporting muscles and overall wellness with farm-fresh quality." },
    { title: "Orange", text: "Orange at FruitSalon boosts immunity with vitamin C and refreshing juiciness, supporting skin and overall health." },
    { title: "Pineapple", text: "Pineapple at FruitSalon delivers tropical freshness and supports digestion with naturally sweet flavor." },
    { title: "Papaya", text: "Papaya at FruitSalon helps digestion and immunity with antioxidants and natural nutrients." },
    { title: "Watermelon", text: "Watermelon at FruitSalon keeps the body hydrated and refreshed with juicy sweetness." },
    { title: "Kiwi", text: "Kiwi at FruitSalon is rich in vitamin C and fiber, supporting immunity and digestion." },
    { title: "Blueberry", text: "Blueberry at FruitSalon is antioxidant-rich, supporting brain health and glowing skin." },
    { title: "Pomegranate", text: "Pomegranate at FruitSalon supports heart health with juicy, antioxidant-rich seeds." },
    { title: "Avocado", text: "Avocado at FruitSalon provides healthy fats for heart, skin, and fitness lifestyle." },
    { title: "Strawberry", text: "Strawberry at FruitSalon offers sweetness and freshness with vitamins and antioxidants." },
    { title: "Cherry", text: "Cherry at FruitSalon is a premium fruit helping reduce inflammation and boost health." },
    { title: "Pear", text: "Pear at FruitSalon is soft, juicy, and rich in fiber for digestion and heart health." },
    { title: "Grapes", text: "Grapes at FruitSalon are sweet, seedless, and perfect for daily healthy snacking." },
    { title: "Litchi", text: "Litchi at FruitSalon is a seasonal delight providing freshness and natural energy." },
  ];

  return (
    <section className="salon1-wrapper">

      <h1 className="salon1-title">Farm Fresh Fruits Salon</h1>

      <div className="salon1-grid">
        {fruits.map((item, index) => (
          <div className="salon1-card" key={index}>
            <h3 className="salon1-card-title">{item.title}</h3>
            <p className="salon1-card-text">{item.text}</p>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Salon1;
