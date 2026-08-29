import Header from "@/components/UI/Header/Header";
import Footer from "@/components/UI/Footer/Footer";
import JsonLd from "@/components/UI/Meta/JsonLd";
import ClientFeedbackReviewPage from "@/components/Pages/ClientFeedback/ClientFeedbackReviewPage";
import { getOptions } from "@/utils/fetchData";
import { getClientFeedbackReviewLinks } from "@/utils/clientFeedback";
import { getSeoMetadata } from "@/utils/metadata";
import { getWebPageSchema } from "@/utils/schema";

export const metadata = getSeoMetadata({
  path: "/client-feedback/review",
  title: "Leave a Review | Epic Cleaning",
  description:
    "Leave a public review for Epic Cleaning on Google or Facebook using the links on this page.",
});

export default async function ClientFeedbackReviewRoute() {
  const options = await getOptions();
  const reviewLinks = getClientFeedbackReviewLinks();
  const jsonLd = getWebPageSchema({
    path: "/client-feedback/review",
    name: "Leave a Review",
    description:
      "Leave a public review for Epic Cleaning on Google or Facebook using the links on this page.",
  });

  return (
    <>
      <JsonLd data={jsonLd} idPrefix="client-feedback-review-schema" />
      <ClientFeedbackReviewPage reviewLinks={reviewLinks} />
    
    </>
  );
}
