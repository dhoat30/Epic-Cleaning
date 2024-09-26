"use client";

import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function ServiceSection({ data }) {
  console.log(data);
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
const Section = styled.section`
  border-top: 1px solid var(--dark-outline-variant);
  padding: 24px 0;
  .sub-heading-wrapper {
    .sub-heading {
      padding: 16px 0 0 0;
      font-weight: 600;
    }
  }
  strong {
    font-weight: 550;
    font-size: 1rem;
    color: var(--dark-on-surface-variant);
    letter-spacing: 0.05rem;
    line-height: 1.5rem;
    margin-top: 8px;
  }
  p,
  li {
    font-size: 1rem;
    color: var(--dark-on-surface-variant);
    font-weight: 350;
    letter-spacing: 0.02rem;
    line-height: 1.5rem;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  ul {
    margin: 0;
    padding: 0 0 0 32px;
    list-style: disc !important;
  }
  .image-wrapper {
    position: relative;
    width: 100%;
    margin: 16px 0 40px 0;
  }
`;
