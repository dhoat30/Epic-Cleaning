import Image from "next/image";
import Link from "next/link";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "80px 0",
      }}
    >
      <div
        className="image-wrapper"
        style={{ position: "relative", width: "100%", paddingBottom: "52%" }}
      >
        <Image src="/404.jpg" fill alt="404 Not Found" />
      </div>
      <Typography
        variant="h4"
        component="h1"
        className="image-text"
        color="white"
        align="center"
      >
        PAGE NOT FOUND
      </Typography>
      <Link href="/">
        <Button size="large" variant="contained" align="center">
          Back to Home
        </Button>
      </Link>
    </Box>
  );
}
