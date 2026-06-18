'use client'
import * as React from "react";
import styles from "./CustomAccordion.module.scss";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = (props) => (
  <MuiAccordion
    className={styles.accordion}
    disableGutters
    elevation={0}
    {...props}
  />
);

const AccordionSummary = (props) => (
  <MuiAccordionSummary className={styles.summary} {...props} />
);

const AccordionDetails = (props) => (
  <MuiAccordionDetails className={styles.details} {...props} />
);

export default function CustomAccordion({ qaData }) {
  const [expanded, setExpanded] = React.useState(false);

  if (!qaData) return null;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Ensure the correct panel is set
  };

  const faqList = qaData.map((item, index) => {
    const accordionPanel = `panel${index}`; // Ensure unique panel ID for each accordion
    return (
      <Accordion
        key={index}
        expanded={expanded === accordionPanel} // Expanded if the panel is the same as the current state
        onChange={handleChange(accordionPanel)} // Handle panel change
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={styles.icon} />}
          aria-controls={`panel${index}a-content`}
          id={`panel${index}a-header`}
        >
          <Typography variant="body1" component="p" className={styles.question}>
            {item.question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            className={styles.answer}
            dangerouslySetInnerHTML={{ __html: item.answer }}
          />
        </AccordionDetails>
      </Accordion>
    );
  });

  return <div>{faqList}</div>;
}
