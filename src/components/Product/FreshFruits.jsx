import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../../css/FreshFruits.css";

import Fresh1 from "../../assets/images/Fresh-1.jpg";
import Fresh2 from "../../assets/images/Fresh-2.jpg";
import Fresh3 from "../../assets/images/Fresh-3.jpg";
import Fresh4 from "../../assets/images/Fresh-4.jpg";
import Fresh5 from "../../assets/images/Fresh-5.jpg";
import Fresh6 from "../../assets/images/Fresh-6.jpg";
import Fresh7 from "../../assets/images/Fresh-7.jpg";
import Fresh8 from "../../assets/images/Fresh-8.jpg";
import Fresh9 from "../../assets/images/Fresh-9.jpg";
import Fresh10 from "../../assets/images/Fresh-10.jpg";
import Fresh11 from "../../assets/images/Fresh-11.jpg";
import Fresh12 from "../../assets/images/Fresh-12.jpg";

function FreshFruits() {

  const [fruits, setFruits] = useState([
    { id: "1", img: Fresh1, name: "Fresh Apple" },
    { id: "2", img: Fresh2, name: "Fresh Cherry" },
    { id: "3", img: Fresh3, name: "Fresh Chinese Dates" },
    { id: "4", img: Fresh4, name: "Fresh Grapes" },
    { id: "5", img: Fresh5, name: "Fresh Lemon" },
    { id: "6", img: Fresh6, name: "Fresh Mandarin" },
    { id: "7", img: Fresh7, name: "Fresh Mango" },
    { id: "8", img: Fresh8, name: "Fresh Orange" },
    { id: "9", img: Fresh9, name: "Fresh Peach" },
    { id: "10", img: Fresh10, name: "Fresh Pear" },
    { id: "11", img: Fresh11, name: "Fresh Plum" },
    { id: "12", img: Fresh12, name: "Fresh Watermelon" }
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(fruits);
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    setFruits(items);
  };

  return (
    <div className="ff-main-wrapper">

      <div className="ff-title-box">
        <h2 className="ff-title-text">Fresh Fruits</h2>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fruits" direction="horizontal">
          {(provided) => (
            <div
              className="container text-center"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="row">
                {fruits.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className="col-12 col-sm-6 col-md-4 col-lg-3"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="ff-card">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="ff-card-image"
                          />
                          <div className="ff-name-box">
                            <span className="ff-fruit-name">
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

export default FreshFruits;
