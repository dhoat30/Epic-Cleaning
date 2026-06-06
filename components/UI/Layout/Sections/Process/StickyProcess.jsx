"use client";
import styles from "./StickyProcess.module.scss";
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { theme } from "@/utils/themeSettings";
import { ThemeProvider } from "@mui/material/styles";

// Custom hook to handle scroll and opacity
const useScrollAndOpacity = (ref) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"], // Adjust this if needed for better results
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.7]);

  // Logging scroll progress for debugging
  return { opacity };
};

export default function StickyProcess({ title, description, cards }) {
  const [linkActive, setLinkActive] = useState({ activeIndex: 0 });

  // Create a ref array for the content sections
  const contentRefs = useRef([]);
  contentRefs.current = cards.map(
    (_, i) => contentRefs.current[i] ?? React.createRef()
  );

  if (!cards) return null;

  // We now return a custom component that contains hooks for each card
  const items = cards.map((item, index) => (
    <ScrollAndOpacityWrapper
      key={index}
      index={index}
      item={item}
      setLinkActive={setLinkActive}
      activeIndex={linkActive.activeIndex}
      ref={contentRefs.current[index]}
    />
  ));

  const content = cards.map((item, index) => (
    <motion.div
      className="step-wrapper content"
      ref={contentRefs.current[index]}
      key={index + 10}
      id={item.title.replace(/\s/g, "-").toLowerCase()}
    >
      <div>
        <Typography variant="h5" component="h2" className="title">
          {item.title}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          className="description"
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></Typography>
      </div>
    </motion.div>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Section as={motion.section}>
        <Container maxWidth="lg" className="container">
          <div className="title-wrapper">
            <Typography variant="h2" component="h2" className="title">
              {title}
            </Typography>
            <div
              className="description body1"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <div className="steps-wrapper">
            <div className="links-wrapper">{items}</div>
            <div className="content-wrapper">{content}</div>
          </div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}

const ScrollAndOpacityWrapper = React.forwardRef(
  ({ item, index, setLinkActive, activeIndex }, ref) => {
    const { opacity } = useScrollAndOpacity(ref); // Using the custom hook

    return (
      <Link
        className="step-wrapper link-wrapper"
        href={`#${item.title.replace(/\s/g, "-").toLowerCase()}`}
        onClick={() => setLinkActive({ activeIndex: index })}
      >
        <motion.div
          className="title"
          style={{
            opacity: opacity,
            zIndex: index + 1,
          }}
        >
          <div className="step-title-number-wrapper">
            <div className="step-number">{index + 1}</div>
            <Typography
              variant="subtitle1"
              component="h3"
              color="var(--dark-on-secondary-container)"
            >
              {item.title}
            </Typography>
          </div>
          <div className="border"></div>
        </motion.div>
      </Link>
    );
  }
);

// Add display name for debugging
ScrollAndOpacityWrapper.displayName = "ScrollAndOpacityWrapper";

const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
