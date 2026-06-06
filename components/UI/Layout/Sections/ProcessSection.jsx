"use client";

import React from "react";
import RegularProcess from "./Process/RegularProcess";
import StickyProcess from "./Process/StickyProcess";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ProcessSection({ title, description, cards }) {
  const matches = useMediaQuery("(min-width:1000px)");

  if (!cards) return null;

  return (
    <>
      {matches ? (
        <StickyProcess title={title} description={description} cards={cards} />
      ) : (
        <RegularProcess title={title} description={description} cards={cards} />
      )}
    </>
  );
}
