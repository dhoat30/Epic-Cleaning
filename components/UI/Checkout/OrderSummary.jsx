import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
export default function OrderSummary({ selectedPackages }) {
  console.log(selectedPackages);
  // Calculate total price
  const totalPrice = selectedPackages.reduce(
    (acc, item) => acc + Number(item.acf.cta_section.service_price),
    0
  );
  return (
    <Container>
      <Typography variant="h5" component="h2">
        Order Summary
      </Typography>
      <div className="summary-wrapper">
        {selectedPackages.map((item, index) => {
          return (
            <Paper key={index} className="card" elevation={2}>
              <Link href={`/service-packages/${item.slug}`} className="link">
                <div className="image-wrapper">
                  <Image
                    src={item.acf.hero_section.image.url}
                    alt={item.acf.hero_section.image.alt}
                    fill
                    priority={true}
                  />
                </div>
                <div className="content-wrapper">
                  <Typography
                    className="title"
                    component="h3"
                    variant="subtitle1"
                  >
                    {item.acf.hero_section.title}
                  </Typography>
                  <Typography className="price" component="div" variant="h5">
                    ${item.acf.cta_section.service_price}
                  </Typography>
                </div>
              </Link>
            </Paper>
          );
        })}
        {/* Display total price */}
        <div className="total-wrapper">
          <Typography className="total" component="div" variant="h6">
            Total: ${totalPrice}
          </Typography>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .summary-wrapper {
    .card {
      padding: 8px;
      margin-top: 16px;
      .link {
        display: grid;
        grid-template-columns: 5fr 7fr;
        gap: 16px;
        align-items: center;

        .image-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
        }
      }
    }
    .total-wrapper {
      margin-top: 16px;
      padding-top: 8px;
      border-top: 1px solid var(--dark-outline-variant);
    }
  }
`;
