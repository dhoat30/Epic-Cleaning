import Header from "@/components/UI/Header/Header";
import Footer from "@/components/UI/Footer/Footer";
import JsonLd from "@/components/UI/Meta/JsonLd";
import ClientFeedbackHub from "@/components/Pages/ClientFeedback/ClientFeedbackHub";
import { getOptions } from "@/utils/fetchData";
import { getSeoMetadata } from "@/utils/metadata";
import { getWebPageSchema } from "@/utils/schema";

export const metadata = getSeoMetadata({
  path: "/client-feedback",
  title: "Client Feedback | Epic Cleaning",
  description:
    "Choose whether to leave a public review or share private feedback with the Epic Cleaning team.",
});

export default async function ClientFeedbackPage() {
  const options = await getOptions();
  const jsonLd = getWebPageSchema({
    path: "/client-feedback",
    name: "Client Feedback",
    description:
      "Choose whether to leave a public review or share private feedback with the Epic Cleaning team.",
  });

  return (
    <>
      <JsonLd data={jsonLd} idPrefix="client-feedback-schema" />
      <ClientFeedbackHub />
   
    </>
  );
}
