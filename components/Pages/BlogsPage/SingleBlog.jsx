"use client";
import styles from "./SingleBlog.module.scss";
import React from "react";
import Container from "@mui/material/Container";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Video from "@/components/UI/Video/Video";
import BottomSocialShare from "@/components/UI/SocialShare/BottomSocialShare";
export default function SingleBlog({ content }) {
  // Ensure data is an array and has at least one item

  return (
    <>
      <ContentSection>
        <div
          className="content-wrapper"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </ContentSection>
    </>
  );
}

const ContentSection = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.contentSection} ${className}`.trim(),
  });
