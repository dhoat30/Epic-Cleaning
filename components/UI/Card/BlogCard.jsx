import React from "react";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import TextLink from "../CTA/TextLink";
export default function BlogCard({
  title,
  description,
  image,
  ctaLabel,
  ctaLink,
  oneByOneAspectRatio,
  authorFirstName,
  authorLastName,
  profilePic,
  publishDate,
}) {
  let publishedDate = new Date(publishDate);
  // Create an array of abbreviated month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Format the date in "9 Jul, 2024" format
  const formattedDate = `${publishedDate.getDate()} ${
    months[publishedDate.getMonth()]
  }, ${publishedDate.getFullYear()}`;

  return (
    <ContainerStyled className="card-wrapper" variant="outlined">
      <Link href={ctaLink}>
        <Box className="image-wrapper">
          {image && (
            <Image
              src={image.url}
              alt={title}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              quality={80}
            />
          )}
        </Box>
      </Link>
      <div className="meta-info-wrapper">
        <div className="profile-pic-wrapper">
          <Image
            src="https://data.webduel.co.nz/wp-content/uploads/2024/05/IMG_3022-scaled-e1715077130872-300x300-1-e1715560169333.jpg"
            alt="Gurpreet Singh Dhoat's Photo"
            fill
          />
        </div>
        <div className="text-wrapper">
          <Typography
            variant="body2"
            component="span"
            className="meta-author-name"
          >
            {authorFirstName} {authorLastName}
          </Typography>
          <Typography variant="body1" component="span" className="divider">
            |
          </Typography>
          <Typography variant="body2" component="span" className="meta-info">
            {formattedDate}
          </Typography>
        </div>
      </div>
      <Box className="content-wrapper">
        <Typography
          variant="h5"
          component="h2"
          className="title"
          color="var(--white)"
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body1"
            component="div"
            className="description"
            dangerouslySetInnerHTML={{ __html: description }}
            color="var(--gray-light)"
          />
        )}
        {ctaLink && (
          <Box className="button-wrapper">
            <TextLink
              url={ctaLink}
              className="cta"
              label={ctaLabel}
              color="var(--dark-secondary)"
            ></TextLink>
          </Box>
        )}
      </Box>
    </ContainerStyled>
  );
}
const ContainerStyled = styled(Paper)`
  border-radius: 12px;
  background: var(--dark-surface-container-low);
  .image-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    @media (max-width: 450px) {
      padding-bottom: 300px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .meta-info-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 24px 0 24px;
    @media (max-width: 450px) {
      padding: 16px 16px 0 16px;
    }
    .profile-pic-wrapper {
      position: relative;
      width: 32px;
      height: 32px;
      img {
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .text-wrapper {
      display: flex;
      align-items: center;
      gap: 4px;
      position: relative;
      flex-wrap: wrap;

      .meta-author-name {
      }
      .divider {
        @media (max-width: 370px) {
          display: none;
        }
      }
    }
  }
  .content-wrapper {
    padding: 16px 24px 24px 24px;
    @media (max-width: 450px) {
      padding: 16px 16px 24px 16px;
    }
    .title {
    }
    .description {
      margin-top: 16px;
    }
    .button-wrapper {
      margin-top: 24px;
    }
  }
`;
