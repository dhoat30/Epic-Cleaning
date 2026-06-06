"use client";
import styles from "./ServiceSection.module.scss";

import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function ServiceSection({ data }) {
  const section = data.map((item, index) => {
    return (
      <Section key={index}>
        <Typography variant="h4" component="h2">
          {item.title}
        </Typography>
        {/* set description dangerously */}
        {item.description && (
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></div>
        )}
        {item.does_this_section_has_a_subheading && (
          <div className="sub-heading-wrapper">
            {item.sub_heading_group.map((subHeadingItem, index) => {
              return (
                <>
                  <Typography
                    key={index}
                    variant="h6"
                    component="h4"
                    className="sub-heading"
                  >
                    {subHeadingItem.subheading}
                  </Typography>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: subHeadingItem.content }}
                  ></div>
                  {subHeadingItem.image && (
                    <div
                      className="image-wrapper"
                      style={{
                        paddingBottom: `${
                          (subHeadingItem.image.height /
                            subHeadingItem.image.width) *
                          100
                        }%`,
                      }}
                    >
                      <Image
                        src={subHeadingItem.image.url}
                        alt={subHeadingItem.image.alt}
                        fill
                        sizes="(max-width: 900px) 100vw, 70vw"
                      />
                    </div>
                  )}
                </>
              );
            })}
          </div>
        )}
      </Section>
    );
  });
  return <>{section}</>;
}
const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
