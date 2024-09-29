import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export default function BeforeAfter({ data, showTitle }) {
  if (!data.afterImage || !data.beforeImage) return null;
  return (
    <Container>
      {showTitle && (
        <Typography component="h2" variant="h3" className="title" color="white">
          Before & After
        </Typography>
      )}

      <ReactCompareSlider
        className="image-wrapper"
        style={{
          paddingBottom: `${
            (data.beforeImage.height / data.beforeImage.width) * 100
          }%`,
        }}
        itemTwo={
          <Image
            src={data.beforeImage.url}
            alt={data.beforeImage.alt ? data.beforeImage.alt : "Before"}
            fill
          />
        }
        itemOne={
          <Image
            src={data.afterImage.url}
            alt={data.afterImage.alt ? data.afterImage.alt : "Before"}
            fill
          />
        }
      />
    </Container>
  );
}
const Container = styled.section`
  padding: 40px 0;
  .image-wrapper {
    margin-top: 16px;
    width: 100%;
    position: relative;
    img {
      object-fit: cover;
    }
  }
`;
