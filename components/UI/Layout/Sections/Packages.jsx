import styles from "./Packages.module.scss";
import Container from "@mui/material/Container";
import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Packages({
  title,
  packagesArray,
  serviceName,
  termsAndConditions,
}) {
  console.log(termsAndConditions);
  const packageComponent = packagesArray.map((item, index) => {
    let packageHighlightClass;
    if (item.do_you_want_to_highlight_this_package) {
      packageHighlightClass = "highlighted-package";
    }
    return (
      <div key={index} className={`package ${packageHighlightClass}`}>
        {item.do_you_want_to_highlight_this_package && (
          <Typography
            variant="subtitle1"
            component="div"
            className="highlighted-tag"
          >
            {item.highlight_label ? item.highlight_label : "Popular"}
          </Typography>
        )}
        <Typography variant="h5" component="h3" className="title" color="white">
          {item.package_name}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className="description mt-16"
          color="var(--dark-on-surface-variant)"
        >
          {item.package_description}
        </Typography>
        <div className="price-wrapper mt-16 mb-16">
          <Typography
            component="span"
            variant="h3"
            className="price"
            color="white"
          >
            ${item.price}
          </Typography>
          <Typography
            color="white"
            component="span"
            variant="body1"
            className="price"
          >
            +GST
          </Typography>
          <Link
            href={{
              pathname: "/book-now",
              query: {
                serviceName: serviceName,
                packageName: item.package_name,
                price: item.price,
                description: item.package_description,
              },
            }}
            className="cta-wrapper mt-16"
          >
            <Button variant="contained" disableElevation>
              BOOK NOW
            </Button>
          </Link>

          <ul className="included-services-wrapper mt-24">
            {item.what_is_included.map((service, index) => {
              return (
                <li key={index} className="flex align-center gap-4 mt-8">
                  <CheckCircleIcon className={styles.checkIcon} />
                  <Typography
                    variant="subtitle1"
                    component="span"
                    color="white"
                  >
                    {service.item}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  });

  return (
    <Section id="packages">
      <Container>
        <Typography
          variant="h2"
          component="h2"
          className="title"
          color="var(--dark-on-surface)"
          align="center"
        >
          {title}
        </Typography>
        <div className="packages-wrapper">{packageComponent}</div>
        <div className="terms-wrapper mt-24">
          {termsAndConditions &&
            termsAndConditions.length > 0 &&
            termsAndConditions.map((term, index) => {
              return (
                <Typography
                  key={index}
                  variant="body2"
                  component="p"
                  className="mb-8"
                  color="var(--dark-on-surface-variant)"
                >
                  *{term.term}
                </Typography>
              );
            })}
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
