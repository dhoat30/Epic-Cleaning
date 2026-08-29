import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styles from "./ClientFeedbackPage.module.scss";

const paths = [
  {
    href: "/client-feedback/private",
    emoji: "😔",
    title: "Not quite right",
    description: "Send private feedback directly to our team.",
    tone: "negative",
  },
  {
    href: "/client-feedback/review",
    emoji: "😊",
    title: "Great experience",
    description: "Leave a public review on Google or Facebook.",
    tone: "positive",
  },
];

export default function ClientFeedbackHub() {
  return (
    <main className={styles.page}>
      <Container maxWidth="md" className={styles.container}>
        <section className={styles.panelCard}>
          <div className={styles.heroCard}>
            <div className={styles.heroTopRow}>
              <span className={styles.eyebrow}>Epic Cleaning follow-up</span>
            </div>
            <div className={styles.heroContent}>
              <Typography variant="h2" component="h1" >
                How was your clean?
              </Typography>
              <Typography
                variant="body1"
                component="p"
                
              >
                Hi there, thanks for trusting us with your clean.
              </Typography>
              <Typography
                variant="body1"
                component="p"
              >
                We&apos;d love to know whether your experience felt great or missed
                the mark.
              </Typography>
            </div>
          </div>

          <div className={styles.pathGrid} aria-label="Feedback options">
            {paths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className={`${styles.pathCard} ${path.tone === "positive" ? styles.positiveCard : styles.negativeCard}`}
              >
                <div className={styles.emojiWrap}>
                  <span className={styles.emoji} aria-hidden="true">
                    {path.emoji}
                  </span>
                </div>
                <Typography variant="h4" component="h2" className={styles.pathTitle}>
                  {path.title}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  className={styles.pathDescription}
                >
                  {path.description}
                </Typography>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
