import styles from "./CarouselArrows.module.scss";
import React from "react";
import LongArrowIcon from "../Icons/LongArrowIcon";
export default function CarouselArrows({ next, previous, className }) {
  return (
    <Container className={`${className} flex justify-end  pb-8`}>
      <div className="wrapper flex gap-2 flex-initial ">
        <button
          type="button"
          className="arrow-wrapper"
          onClick={previous}
          aria-label="Previous slide"
        >
          <LongArrowIcon />
        </button>
        <button
          type="button"
          className="arrow-wrapper"
          onClick={next}
          aria-label="Next slide"
        >
          <LongArrowIcon className="right-arrow" />
        </button>
      </div>
    </Container>
  );
}

const Container = ({ className = "", ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.container} ${className}`.trim(),
  });
