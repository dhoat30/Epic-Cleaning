import styles from "./FaqAccordionSection.module.scss";
import React from "react";
import CustomAccordion from "../../Accordion/CustomAccordion";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
function FaqAccordionSection({ title, description, qaData }) {
  if (!qaData) return null;
  return (
    <Section>
      <Container maxWidth="xl">
        <div className="grid-wrapper ">
          <div className="title-wrapper">
            <span className={styles.badge}>FAQ</span>
            <Typography variant="h2" component="h2" className={`${styles.title} mt-16`}>
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="text.secondary" className="mt-16">
              {description}
            </Typography>
          </div>
          <CustomAccordion qaData={qaData} />
        </div>
      </Container>
    </Section>
  );
}

export default FaqAccordionSection;
const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
