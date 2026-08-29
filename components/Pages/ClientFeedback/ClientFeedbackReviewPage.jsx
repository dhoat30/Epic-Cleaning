import Image from "next/image";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styles from "./ClientFeedbackPage.module.scss";

export default function ClientFeedbackReviewPage({ reviewLinks }) {
  return (
    <main className={styles.page}>
      <Container maxWidth="md" className={styles.container}>
        <section className={styles.reviewPanel}>
          <div className={styles.reviewIntro}>
            <span className={styles.eyebrow}>Epic Cleaning reviews</span>
         
            <Typography component="p" className={styles.reviewCopy}>
              We&apos;re so glad you had a great experience with Epic Cleaning.
            </Typography>
            <Typography component="p" className={styles.reviewCopy}>
              If you have a minute, a review on either platform below would
              mean a lot to our team.
            </Typography>
          </div>

          <div className={styles.reviewGrid} aria-label="Review destinations">
            {reviewLinks.map((item) => (
              <article key={item.id} className={styles.reviewCard}>
                <Image
                  src={item.logo}
                  alt={item.logoAlt}
                  width={72}
                  height={72}
                  className={styles.reviewLogo}
                />
                <Typography component="h2" className={styles.reviewCardTitle}>
                  {item.title}
                </Typography>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.reviewButton}
                >
                  {item.buttonLabel}
                </a>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
