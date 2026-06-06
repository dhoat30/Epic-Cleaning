import styles from "./RowCard.module.scss";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

import TextLink from "../CTA/TextLink";

export default function RowCard({
  title,
  description,
  image,
  className,
  ctaLink,
  ctaLabel,
}) {
  // animation control for the bulb in the background
  const controls = useAnimation();

  const handleMouseEnter = () => {
    controls.start({
      width: "100%",
      height: "100%",
      // background:
      //   "linear-gradient(180deg, rgba(151, 71, 255, 0.00) 0%, rgba(151, 71, 255, 0.67) 100%)",
      transition: { duration: 0.2, type: "tween" }, // Set a transition duration
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      width: 0,
      height: 0,
      background: "none",
      boxShadow: "none",
      transition: { duration: 0.2, type: "tween" }, // Set a transition duration
    });
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
      whileHover={{
        transition: { duration: 0.2 },
      }}
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
            viewport={{ once: true, amount: "all" }}
            variants={textVariation}
          >
            {title}
          </Typography>
          <Typography
            component={motion.p}
            variant="h6"
            className="description "
            color="var(--dark-on-surface)"
            dangerouslySetInnerHTML={{ __html: description }}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: "all" }}
            variants={textVariation}
          />

          <TextLink label={ctaLabel} url={ctaLink} className="cta" />
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
            priority
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
