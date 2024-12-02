import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import GoogleIcon from "../../Icons/GoogleIcon";

export default function GoogleReviewCard({ name, description, customerPic, className }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const numberOfStars = 5;
  const starsJSX = Array.from({ length: numberOfStars }, (_, index) => (
    <StarIcon key={index} sx={{ color: "#FABB05", fontSize: "1rem" }} />
  ));

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Limit description to 200 characters if not expanded
  const charLimit = 180;
  const shortDescription =
    description.length > charLimit
      ? description.slice(0, charLimit) + "..."
      : description;

  return (
    <Div className={className}>
      <div className="profile-wrapper">
        <Image
          src={customerPic}
          alt={`${name} profile picture`}
          width="40"
          height="40"
        />
        <div className="name-wrapper">
          <Typography variant="subtitle1" component="h3">
            {name}
          </Typography>
          {starsJSX}
        </div>
      </div>
      <div className="description-wrapper mt-16 mb-16">
        <Typography variant="body1" component="p">
          {isExpanded ? description : shortDescription}
        </Typography>
        {description.length > charLimit && (
          <button onClick={toggleExpand} className="read-more-button">
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
      <GoogleIcon />
    </Div>
  );
}

const Div = styled.div`
  background: var(--light-surface-container);
  padding: 16px;
  border: 1px solid var(--light-outline-variant);
  max-width: calc(100% - 16px);
  .profile-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .description-wrapper {
    position: relative;
    p {
      margin-bottom: 8px;
    }
    .read-more-button {
      background: none;
      border: none;
      color: var(--light-primary);
      cursor: pointer;
      font-weight: 500;
      text-decoration: underline;
    }
  }
`;
