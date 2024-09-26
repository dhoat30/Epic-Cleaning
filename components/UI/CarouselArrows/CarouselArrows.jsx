import React from "react";
import styled from "styled-components";
import LongArrowIcon from "../Icons/LongArrowIcon";
export default function CarouselArrows({ next, previous, className }) {
  return (
    <Container className={`${className} flex justify-end  pb-8`}>
      <div className="wrapper flex gap-2 flex-initial ">
        <div className="arrow-wrapper " onClick={previous}>
          <LongArrowIcon />
        </div>
        <div className="arrow-wrapper " onClick={next}>
          <LongArrowIcon className="right-arrow" />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  .arrow-wrapper {
    cursor: pointer;
    &:hover {
      svg {
        path {
          fill: var(--light-on-surface, #1d1b16);
        }
      }
    }
  }
  .right-arrow {
    transform: rotate(180deg);
  }
`;
