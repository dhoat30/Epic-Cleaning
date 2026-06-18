import styles from "./FaqAccordionSection.module.scss";
import React from "react";
import CustomAccordion from "../../../Accordion/CustomAccordion";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
function FaqAccordionSection({ title, description, qaData }) {
  if (!qaData) return null;
  return (
    <Section>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.gridWrapper}>
          <div className={styles.titleWrapper}>
            {/* <div className="section-eyebrow">FAQ</div> */}
            <Typography variant="h2" component="h2" className={styles.title}>
              {title}
            </Typography>
            {/* <Typography variant="body1" component="p" className={styles.description}>
              {description}
            </Typography> */}
          </div>
          <div className={styles.accordionWrapper}>
            <CustomAccordion qaData={qaData} />
          </div>
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
