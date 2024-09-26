import Typography from "@mui/material/Typography";
import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
export default function SingleProjectContentSections({ dataArr }) {
  if (!dataArr.length) return null;
  const sections = dataArr.map((item, index) => {
    return (
      <>
        <Section key={index} id={item.acf_fc_layout}>
          {item.title && (
            <Typography variant="h3" component="h2" color="white">
              {item.title}
            </Typography>
          )}
          {item.content && (
            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
          )}
          {item.image && (
            <div
              className="image-wrapper"
              style={{
                paddingBottom: `${
                  (item.image.height / item.image.width) * 100
                }%`,
              }}
            >
              <Image
                src={item.image.url}
                fill
                alt={item.image.alt}
                quality={100}
              />
            </div>
          )}

          {/* Loop over item.repeater array */}
          {item.repeater &&
            item.repeater.map((repeaterItem, repeaterIndex) => {
              // Render HTML for each element in item.repeater
              return (
                <div key={repeaterIndex} className="sub-section">
                  <Typography
                    variant="h4"
                    component="h3"
                    color="white"
                    className="sub-section-title"
                  >
                    {repeaterItem.title}
                  </Typography>
                  {repeaterItem.content && (
                    <div
                      dangerouslySetInnerHTML={{ __html: repeaterItem.content }}
                    ></div>
                  )}
                  {repeaterItem.image && (
                    <div
                      className="image-wrapper"
                      style={{
                        paddingBottom: `${
                          (repeaterItem.image.height /
                            repeaterItem.image.width) *
                          100
                        }%`,
                      }}
                    >
                      <Image
                        src={repeaterItem.image.url}
                        fill
                        alt={repeaterItem.image.alt}
                        quality={100}
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </Section>
      </>
    );
  });
  return <>{sections}</>;
}

const Section = styled.section`
  padding: 24px 0 56px 0;

  @media (max-width: 1080px) {
    padding: 24 0 56px 0;
  }
  @media (max-width: 600px) {
    padding: 24px 0 16px 0;
  }
  scroll-margin-top: 70px; /* slightly more than the navbar height */
  .sub-section {
    margin: 24px 0 40px 0;
  }
  p {
    margin-top: 8px;
    font-weight: 300;
    letter-spacing: 0.07rem;
    font-family: var(--font-work-sans), "Segoe UI", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: white;
  }
  strong {
    font-weight: 600;
  }
  .image-wrapper {
    position: relative;
    width: 100%;
    margin-top: 16px;
    img {
      object-fit: cover;
    }
  }
  ol {
    color: white;
    li {
      margin: 12px 0;
    }
    strong {
      color: white;
    }
  }
  ul {
    list-style: disc !important;
    color: white;
    li {
      margin: 12px 0;
      line-height: 1.5;
      letter-spacing: 0.05rem;
    }
    strong {
      color: white;
    }
  }
  h2 {
    @media (max-width: 370px) {
      font-size: 2.5rem;
    }
  }
  h3 {
    font-size: 1.5rem;
  }
  h6 {
    color: white;
    font-size: 1.2rem;
    margin: 16px 0;
  }
`;
