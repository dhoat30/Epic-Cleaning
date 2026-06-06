"use client";
import styles from "./ScrollableTabs.module.scss";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../utils/themeSettings";
import BeforeAfter from "../BeforeAfterSlider/BeforeAfter";
import Link from "next/link";
import Button from "@mui/material/Button";
import Image from "next/image";
function CustomTabPanel(props) {
  const {
    children,
    value,
    index,
    description,
    title,
    images,
    ctaArray,
    ...other
  } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="tab-content-wrapper">
          <div className="image-container">
            {images.before_image && images.after_image && (
              <BeforeAfter
                showTitle={false}
                data={{
                  beforeImage: images.before_image,
                  afterImage: images.after_image,
                }}
              />
            )}
            {images.after_image && !images.before_image && (
              <div
                className="image-wrapper"
                style={{
                  paddingBottom: `${
                    (images.after_image.height / images.after_image.width) * 100
                  }%`,
                }}
              >
                <Image
                  src={images.after_image.url}
                  alt={images.after_image.url}
                  fill
                />
              </div>
            )}
          </div>
          <div className="content-wrapper">
            <Typography variant="h4" component="h3" className="title">
              {title}
            </Typography>
            <Typography
              color="var(--dark-on-surface)"
              variant="body1"
              component="div"
              className="description body1 mt-16"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="cta-wrapper flex gap-8 flex-wrap mt-24">
              {ctaArray.length > 0 &&
                ctaArray.map((cta, index) => {
                  return (
                    <Link key={index} href={cta.url} className="cta">
                      <Button
                        variant={`${index === 0 ? "contained" : "outlined"}`}
                        color="secondary"
                        disableElevation
                      >
                        {cta.label}
                      </Button>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default function ScrollableTabs({ tabsData }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = tabsData.map((item, index) => {
    return <Tab key={index} label={item.title} />;
  });
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
          textColor="secondary"
          indicatorColor="secondary"
          className="tabs-wrapper"
        >
          {tabs}
        </Tabs>
        {/* content panels  */}
        {tabsData.map((item, index) => {
          return (
            <CustomTabPanel
              key={100 + index}
              value={value}
              index={index}
              className="description-wrapper"
              description={item.description}
              title={item.title}
              ctaArray={item.buttons}
              images={item.images}
            ></CustomTabPanel>
          );
        })}
      </Container>
    </ThemeProvider>
  );
}

const Container = ({ className = "", ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.container} ${className}`.trim(),
  });
