'use client';

import { useRef, useCallback } from "react";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Slider from "react-slick";
import CarouselArrows from "../CarouselArrows/CarouselArrows";
import Link from "next/link";
import Button from "@mui/material/Button";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import GoogleReviewCard from "./GoogleReviewCard/GoogleReviewCard";
import Typography from "@mui/material/Typography";


export default function GoogleReviews({data}) {


  // filter review comment 
  const filteredReviewData = data.filter((item) => { 
    return (    item.starRating === "FIVE" &&
      typeof item.comment === "string" && // Ensure comment is a string
      item.comment.length > 250 // Check length of the comment
      )
  });

  
  const testimonialCardsJSX = filteredReviewData.map(
    (item, index) => {
      if (index > 10) return null;
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
      <div className="title-row">
          <Typography
            variant="h2"
            component="h2"
            className="title"
            align="center"
          >
          Google Reviews
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className="description mt-16"
            align="center"
          >
Read feedback from our clients and learn how our services have made a positive impact.          </Typography>
        </div>
        <div className="arrows-wrapper">
          <CarouselArrows next={next} previous={previous} />
        </div>
      </Container>
      <div className="carousel-wrapper mt-16">
     
          {testimonialCardsJSX}
      
      </div>
      <Container maxWidth="xl" className="cta-wrapper mt-32">
        <Link href={"/"} target="_blank">
          <Button variant={`contained`} endIcon={<CallMadeOutlinedIcon />}>
           Leave a Review 
          </Button>
        </Link>
        <Link href="/testimonials">
          <Button variant={`outlined`}>
            Read More Reviews
          </Button>
        </Link>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  border-top: 1px solid var(--dark-outline-variant);
  border-bottom: 1px solid var(--dark-outline-variant);

  padding: 80px 0;
  @media (max-width: 600px) {
    padding: 40px 0;
  }
  .arrows-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .carousel-wrapper {
  }
  .cta-wrapper {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap; 
  }
`;
