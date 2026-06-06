import styles from "./RowCardTabs.module.scss";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

import TextLink from "../CTA/TextLink";
import ScrollableTabs from "@/components/UI/Tabs/ScrollableTabs";

export default function RowCardTabs({
  title,
  description,
  image,
  className,
  ctaLink,
  ctaLabel,
  tabsData,
}) {
  // animation control for the bulb in the background
  const controls = useAnimation();

  // hover animation for box
  const handleMouseEnter = () => {
    controls.start({ opacity: 1, width: "100%", height: "100%" }); // Show the gradient
  };

  const handleMouseLeave = () => {
    controls.start({ opacity: 0, width: "0", height: "0" }); // Hide the gradient
  };

  // scroll animation for title, description and image
  const textVariation = {
    offscreen: {
      opacity: 0,
      y: "20px",
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };
  const imageVariation = {
    offscreen: {
      opacity: 0,
      y: "20px",
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };
  return (
    <Container
      className={`${className} row`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="bulb" animate={controls}></motion.div>
      <div className="wrapper">
        <Box className="content-wrapper">
          <Typography
            component={motion.h2}
            variant="h4"
            color="white"
            className=" title"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={textVariation}
          >
            {title}
          </Typography>
          <Typography
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: "all" }}
            variants={textVariation}
            variant="h6"
            component={motion.p}
            className="description "
            color="var(--dark-on-surface)"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {ctaLink && (
            <TextLink label={ctaLabel} url={ctaLink} className="cta" />
          )}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: "all" }}
            variants={textVariation}
          >
            <ScrollableTabs tabsData={tabsData} />
          </motion.div>
        </Box>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: "all" }}
          variants={imageVariation}
          className="image-wrapper"
          style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
        >
          <Image
            src={image.url}
            alt={title}
            fill
            sizes="(max-width: 1080px) 100vw, 50vw "
          />
        </motion.div>
      </div>
    </Container>
  );
}

const Container = ({ className = "", ...props }) =>
  React.createElement(motion.div, {
    ...props,
    className: `${styles.container} ${className}`.trim(),
  });
