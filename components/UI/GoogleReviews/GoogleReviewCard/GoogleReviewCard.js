import styles from "./GoogleReviewCard.module.scss";
import React, { useState } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import GoogleIcon from "../../Icons/GoogleIcon";

export default function GoogleReviewCard({ name, description, customerPic, className }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const numberOfStars = 5;
  const starsJSX = Array.from({ length: numberOfStars }, (_, index) => (
    <StarIcon key={index} className={styles.star} />
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
          <Typography variant="subtitle2" component="h3" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
          <div style={{ display: 'flex', gap: '2px' }}>{starsJSX}</div>
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

const Div = ({ className = "", ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.div} ${className}`.trim(),
  });
