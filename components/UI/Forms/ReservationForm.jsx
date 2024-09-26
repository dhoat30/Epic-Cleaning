import React from "react";
import styled from "styled-components";
export default function ReservationForm({ reservationFormIframe }) {
  return (
    <Container className="py-16">
      <div
        className="iframe-container row-max"
        dangerouslySetInnerHTML={{ __html: reservationFormIframe }}
      ></div>
    </Container>
  );
}
const Container = styled.div`
  background: white;
`;
