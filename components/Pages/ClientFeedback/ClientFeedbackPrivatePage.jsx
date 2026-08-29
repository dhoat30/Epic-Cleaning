import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ClientFeedbackPrivateForm from "./ClientFeedbackPrivateForm";
import styles from "./ClientFeedbackPage.module.scss";

const details = [
  {
    icon: CheckRoundedIcon,
    title: "A direct line to our team",
    description:
      "Your message comes straight through to us so we can review it promptly.",
  },
  {
    icon: SupportAgentRoundedIcon,
    title: "A chance to make things right",
    description:
      "If something missed the mark, we want to understand it and respond thoughtfully.",
  },
  {
    icon: MarkEmailReadRoundedIcon,
    title: "Simple, no-friction follow-up",
    description:
      "Leave your preferred contact details and we’ll get back to you as soon as we can.",
  },
];

export default function ClientFeedbackPrivatePage() {
  return (
    <main className={styles.page}>
      <Container maxWidth="md" className={styles.container}>
        <section>
       

          <aside className={styles.formCard} aria-label="Private feedback form">
            <div className={styles.formHeader}>
              <Typography
                variant="h4"
                component="h2"
                className={styles.formTitle}
              >
                Share your feedback
              </Typography>
              <Typography variant="body1" component="p" className={styles.introText}>
                We read every message and use it to improve the experience we
                deliver.
              </Typography>
            </div>
            <ClientFeedbackPrivateForm />
          </aside>
        </section>
      </Container>
    </main>
  );
}
