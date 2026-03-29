import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../../css/DrideFruits.css";


import D1 from "../../assets/images/Dried-1.jpg";
import D2 from "../../assets/images/Dried-2.jpg";
import D3 from "../../assets/images/Dried-3.jpg";
import D4 from "../../assets/images/Dried-4.jpg";
import D5 from "../../assets/images/Dried-5.jpg";
import D6 from "../../assets/images/Dried-6.jpg";
import D7 from "../../assets/images/Dried-7.jpg";
import D8 from "../../assets/images/Dried-8.jpg";
import D9 from "../../assets/images/Dried-9.jpg";
import D10 from "../../assets/images/Dried-10.jpg";
import D11 from "../../assets/images/Dried-11.jpg";
import D12 from "../../assets/images/Dried-12.jpg";
import D13 from "../../assets/images/Dried-13.jpg";
import D14 from "../../assets/images/Dried-14.jpg";
import D15 from "../../assets/images/Dried-15.jpg";

function DrideFruits() {

  const [fruits, setFruits] = useState([
    { id: "1", img: D1, name: "Dried Lemon" },
    { id: "2", img: D2, name: "Dried Apple" },
    { id: "3", img: D3, name: "Dried Apricot" },
    { id: "4", img: D4, name: "Dried Cantaloupe" },
    { id: "5", img: D5, name: "Dried Cherry" },
    { id: "6", img: D6, name: "Dried Cranberry" },
    { id: "7", img: D7, name: "Dried Dates" },
    { id: "8", img: D8, name: "Dried Flavedo" },
    { id: "9", img: D9, name: "Dried Kiwi" },
    { id: "10", img: D10, name: "Dried Mango" },
    { id: "11", img: D11, name: "Dried Passion Fruit" },
    { id: "12", img: D12, name: "Dried Peach" },
    { id: "13", img: D13, name: "Dried Pear" },
    { id: "14", img: D14, name: "Dried Pomelo" },
    { id: "15", img: D15, name: "Dried Strawberry" }
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(fruits);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setFruits(items);
  };

  return (
    <div className="df-wrapper">

    
      <div className="df-title-box">
        <h2 className="df-title-text">Dride Fruits</h2>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dried-fruits">
          {(provided) => (
            <div
              className="container text-center"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="row">
                {fruits.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="col-12 col-sm-6 col-md-4 col-lg-3"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="df-card">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="df-card-image"
                          />
                          <div className="df-name-box">
                            <span className="df-fruit-name">
                              {item.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  );
}

export default DrideFruits;
