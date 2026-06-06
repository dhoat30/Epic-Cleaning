"use client";
import React from "react";
import styles from "./Checkout.module.scss";

import Container from "@mui/material/Container";
import CheckoutForm from "@/components/UI/Forms/CheckoutForm";
import OrderSummary from "@/components/UI/Checkout/OrderSummary";

export default function Checkout({
  serviceName,
  packageName,
  price,
  description,
  attributes,
}) {
  return (
    <Section>
      <Container maxWidth="lg">
        <div className="wrapper">
          <div className="form-wrapper">
            <CheckoutForm packageName={packageName} serviceName={serviceName} />
          </div>
          {!packageName ? null : (
            <div className="order-summary-wrapper">
              <OrderSummary
                serviceName={serviceName}
                packageName={packageName}
                price={price}
                description={description}
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
