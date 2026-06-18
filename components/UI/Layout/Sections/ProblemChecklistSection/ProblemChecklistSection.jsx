import styles from "./ProblemChecklistSection.module.scss";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Image from "next/image";

const getChecklistItems = (checklistCard) => {
  if (!checklistCard) return [];
  return checklistCard.checklist_items || checklistCard.checklist || [];
};

const getChecklistItemText = (item) => {
  if (typeof item === "string") return item;
  return item?.value || item?.text || item?.title || "";
};

const TextCard = ({ card }) => {
  if (!card?.title && !card?.description) return null;

  return (
    <div className={`${styles.surfaceCard} ${styles.textCard}`}>
      {card.title && (
        <Typography variant="h4" component="h3" className={styles.cardTitle} color="var(--light-primary)">
          {card.title}
        </Typography>
      )}
      {card.description && (
        <div
      
          className={`body1 mt-8`}
          dangerouslySetInnerHTML={{ __html: card.description }}
        />
      )}
    </div>
  );
};

export default function ProblemChecklistSection({
  subtitle,
  title,
  description,
  checklistCard,
  topCard,
  bottomCard,
  pivotCard,
}) {
  const checklistItems = getChecklistItems(checklistCard);
  if (
    !subtitle &&
    !title &&
    !description &&
    !checklistCard &&
    !topCard &&
    !bottomCard &&
    !pivotCard
  ) {
    return null;
  }

  return (
    <Section>
      <Container maxWidth="lg">
        <div className={styles.sectionHeader}>
          {subtitle && <div className="section-eyebrow">{subtitle}</div>}
          {title && (
            <div className="heading2" dangerouslySetInnerHTML={{ __html: title }} />
          )}
          {description && (
            <Typography
              variant="h5"
              component="div"
              className="mt-16"
              color="var(--light-on-surface-variant)"
            >
              {description}
            </Typography>
          )}
        </div>

        <div className={`${styles.contentGrid} mt-32`}>
          <div className={`${styles.surfaceCard} ${styles.checklistCard}`}>
            {checklistCard?.title && (
              <Typography
                variant="h4"
                component="h3"
                color="var(--light-primary)"
                className={styles.cardTitle}
              >
                {checklistCard.title}
              </Typography>
            )}

            {checklistItems.length > 0 && (
              <ul className={`${styles.checklist} mt-8`}>
                {checklistItems.map((item, index) => {
                

                  return (
                    <li key={`${item.item}-${index}`} >
                      <CheckBoxOutlineBlankIcon aria-hidden="true" />
                      <Typography variant="body1" component="span">
                        {item.item}
                      </Typography>
                    </li>
                  );
                })}
              </ul>
            )}

            {checklistCard?.conclusion_text && (
              <Typography
                variant="body1"
                component="div"
                className={"mt-16 " }
               
              >{checklistCard.conclusion_text}</Typography>
            )}
          </div>

          {(topCard || bottomCard) && (
            <div className={styles.sideCards}>
              <TextCard card={topCard} />
              <TextCard card={bottomCard} />
            </div>
          )}
        </div>

        {pivotCard && (
          <div className={styles.calloutCard}>
            <div className={styles.calloutIcon} aria-hidden="true">
              <Image
                src={pivotCard.icon?.url}
                alt="Callout Icon"
                width={100}
                height={100}
              />
            </div>
            <div className={styles.calloutContent}>
              {pivotCard.title && (
                <div className={styles.calloutLabel}>{pivotCard.title}</div>
              )}
              {pivotCard.description && (
                <div
                  className="heading6 mt-8"
                  dangerouslySetInnerHTML={{ __html: pivotCard.description }}
                />
              )}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

const Section = ({ className = "", ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.section} ${className}`.trim(),
  });
