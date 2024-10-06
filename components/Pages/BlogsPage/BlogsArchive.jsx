"use client";

import React from "react";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BlogCard from "@/components/UI/Card/BlogCard";
import CardsTemplate from "@/components/UI/HtmlPageTemplate/CardsTemplate";
import Link from "next/link";
import Button from "@mui/material/Button";
const staticDescription =
  "Whether you need one-off cleaning, weekly, daily or want a monthly package, we will happily help you with what fits your bill. We cater to the client’s pain areas and assure them of desired outcomes while they sit back, relax and enjoy the day.";
export default function BlogsArchive({
  title = "Cleaning Tips & Insights",
  description = staticDescription,
  sectionUI = false,
  blogsData,
  show = 1000,
}) {
  if (!blogsData) {
    console.log("no page data");
    return null;
  }
  const heroData = {
    title: title,
    description: description,
  };
  const blogsDataArr = blogsData.map((blog) => {
    return {
      title: blog.title.rendered,
      description: blog.excerpt.rendered,
      image: blog.acf.blog_featured_image,
      ctaLink: `/blogs/${blog.slug}`,
      ctaLabel: "READ MORE",
      slug: blog.slug,
      publishDate: blog.date_gmt,
      profilePic: blog.acf.user.user_avatar,
      authorFirstName: blog.acf.user.user_firstname,
      authorLastName: blog.acf.user.user_lastname,
      categoryDetails: blog.category_details,
    };
  });

  const cards = blogsDataArr.map((item, index) => {
    if (index >= show) return null;
    return (
      <BlogCard
        key={index}
        title={item.title}
        image={item.image}
        ctaLink={item.ctaLink}
        ctaLabel={item.ctaLabel ? item.ctaLabel : "LEARN MORE"}
        description={item.description}
        authorFirstName={item.authorFirstName}
        authorLastName={item.authorLastName}
        profilePic={item.profilePic}
        publishDate={item.publishDate}
        categoryDetails={item.categoryDetails}
      />
    );
  });
  return (
    <>
      {sectionUI ? (
        <Section className="mt-8">
          <Container maxWidth="xl">
            <div className="title-row">
              <Typography
                variant="h2"
                component="h2"
                className="title"
                align="center"
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                component="p"
                className="description mt-16"
                align="center"
              >
                {description}
              </Typography>
            </div>

            <div className="cards mt-24">{cards}</div>
            <Link href="/blogs" className="flex justify-center mt-24">
              <Button variant="contained" size="large">
                VIEW ALL BLOGS
              </Button>
            </Link>
          </Container>
        </Section>
      ) : (
        <CardsTemplate cardsDataArr={blogsDataArr} heroData={heroData} />
      )}
    </>
  );
}

const Section = styled.section`
  background: var(--light-surface-container-lowest);

  padding: 80px 0;
  @media (max-width: 900px) {
    padding: 40px 0;
  }

  .title-row {
    max-width: 1000px;
    margin: 0 auto;
    iption {
      margin-top: 16px;
    }
  }
  .cards {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
    @media (max-width: 1100px) {
      gap: 16px;

      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }
`;
