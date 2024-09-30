"use client";

import styled from "@emotion/styled";
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
      background: var(--light-surface-container-lowest);
      padding: 24px;
      min-height: 719px;
      border-radius: 12px;
    }
    .order-summary-wrapper {
      background: var(--light-surface-container-lowest);
      padding: 24px;
      position: sticky;
      top: 80px;
      border-radius: 12px;
    }
  }
`;
