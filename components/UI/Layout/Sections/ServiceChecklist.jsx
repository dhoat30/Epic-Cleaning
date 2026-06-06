import styles from "./ServiceChecklist.module.scss";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
export default function ServiceChecklist({
  title = "Our Process",
  description,
  cards,
}) {
  if (cards.length === 0) return null;
  const checklist = cards.map((card, index) => {
    return (
      <div className="card" key={index}>
        <Typography
          variant="h6"
          component="h3"
          className="title flex align-center gap-4"
          color="var(--light-on-primary-fixed-variant)"
        >
          <CheckBoxOutlinedIcon />
          <span> {card.title}</span>
        </Typography>

        <Typography
          variant="body1"
          component="div"
          className="description mt-8"
          dangerouslySetInnerHTML={{ __html: card.description }}
        />
      </div>
    );
  });
  return (
    <Section>
      <Container maxWidth="xl">
        <div className="grid-wrapper ">
          <div className="title-wrapper">
            <Typography variant="h2" component="h2" className="description">
              {title}
            </Typography>
            {/* add html dangerously  */}

            <Typography
              variant="body1"
              component="p"
              className="description mt-16"
            >
              {description}
            </Typography>
          </div>
          <div className="card-wrapper"> {checklist} </div>
        </div>
      </Container>
    </Section>
  );
}

const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
