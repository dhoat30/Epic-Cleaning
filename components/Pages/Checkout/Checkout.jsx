"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import CheckoutForm from "@/components/UI/Forms/CheckoutForm";
import Paper from "@mui/material/Paper";
import OrderSummary from "@/components/UI/Checkout/OrderSummary";

export default function Checkout({ servicePackages }) {
  const [selectedPackages, setSelectedPackages] = useState(null);
  useEffect(() => {
    const slugs = Cookies.get("services"); // Ensure this matches the cookie key used when setting
    const slugArray = slugs ? JSON.parse(slugs) : [];

    if (slugArray.length > 0 && servicePackages.length > 0) {
      const filteredPackages = servicePackages.filter((p) =>
        slugArray.includes(p.slug)
      );
      setSelectedPackages(filteredPackages);
    }
  }, [servicePackages]);

  return (
    <Section>
      <Container maxWidth="lg">
        <div className="wrapper">
          <div className="form-wrapper">
            <CheckoutForm />
          </div>
          {!selectedPackages ? null : (
            <div className="order-summary-wrapper">
              <OrderSummary selectedPackages={selectedPackages} />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
const Section = styled.section`
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding-top: 80px;
    padding-bottom: 80px;
    align-items: start;
    justify-content: center;
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 40px;
      padding-top: 80px;
      padding-bottom: 40px;
    }
    @media (max-width: 600px) {
      padding: 80px 0 40px 0;
    }

    .form-wrapper {
      background: var(--dark-surface-container-lowest);
      padding: 24px;
      min-height: 719px;
      border-radius: 12px;
    }
    .order-summary-wrapper {
      background: var(--dark-surface-container-lowest);
      padding: 24px;
      position: sticky;
      top: 80px;
      border-radius: 12px;
    }
  }
`;
