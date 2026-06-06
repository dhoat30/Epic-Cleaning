'use client';
import React from "react";
import styles from "./GoogleReviewGridLayout.module.scss";

import { useRef, useCallback } from "react";
import Container from "@mui/material/Container";
import CarouselArrows from "../CarouselArrows/CarouselArrows";
import Link from "next/link";
import Button from "@mui/material/Button";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import GoogleReviewCard from "./GoogleReviewCard/GoogleReviewCard";
import Typography from "@mui/material/Typography";


export default function GoogleReviewGridLayout({data}) {


  // filter review comment 
  const filteredReviewData = data.filter((item) => { 
    return (    item.starRating === "FIVE" &&
      typeof item.comment === "string"
      )
  });

  
  const testimonialCardsJSX = filteredReviewData.map(
    (item, index) => {
    
      return (
        <GoogleReviewCard
          key={index}
          name={item.reviewer.displayName}
          description={item.comment}
          customerPic={item.reviewer.profilePhotoUrl}
        />
      );
    }
  );

  return (
    <Section>
      <Container maxWidth="xl">
        <div className="grid-wrapper mt-16">{testimonialCardsJSX}</div>
       
      </Container>
    </Section>
  );
}

const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
