import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "./CarouselImages.module.css";

function CarouselImages({ currentImageOrder }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={styles["book-image-container"]}>
      <Carousel activeIndex={index} onSelect={handleSelect} controls={false}>
        {currentImageOrder.map((image, i) => (
          <Carousel.Item key={i}>
            <img
              style={{ maxHeight: "300px" }}
              src={`http://localhost:5000${image.path}`}
              className={styles["carousel-image"]}
              alt={`Image ${i + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselImages;
