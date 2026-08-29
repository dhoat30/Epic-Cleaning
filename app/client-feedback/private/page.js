import Header from "@/components/UI/Header/Header";
import Footer from "@/components/UI/Footer/Footer";
import JsonLd from "@/components/UI/Meta/JsonLd";
import ClientFeedbackPrivatePage from "@/components/Pages/ClientFeedback/ClientFeedbackPrivatePage";
import { getOptions } from "@/utils/fetchData";
import { getSeoMetadata } from "@/utils/metadata";
import { getWebPageSchema } from "@/utils/schema";

export const metadata = getSeoMetadata({
  path: "/client-feedback/private",
  title: "Private Feedback | Epic Cleaning",
  description:
    "Share private feedback with the Epic Cleaning team so we can follow up and make things right.",
});

export default async function ClientFeedbackPrivateRoute() {
  const options = await getOptions();
  const jsonLd = getWebPageSchema({
    path: "/client-feedback/private",
    name: "Private Feedback",
    description:
      "Share private feedback with the Epic Cleaning team so we can follow up and make things right.",
    type: "ContactPage",
  });

  return (
    <>
      <JsonLd data={jsonLd} idPrefix="client-feedback-private-schema" />
    
      <ClientFeedbackPrivatePage />
      
    </>
  );
}
