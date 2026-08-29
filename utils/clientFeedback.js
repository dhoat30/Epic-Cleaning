export function getClientFeedbackReviewLinks() {
  return [
    {
      id: "google",
      title: "Google",
      href: process.env.GOOGLE_REVIEW_URL,
      logo: "/Google-Review-Symbol.png",
      logoAlt: "Google",
      buttonLabel: "Leave a Google review",
    },
    {
      id: "facebook",
      title: "Facebook",
      href: process.env.FACEBOOK_REVIEW_URL,
      logo: "/facebook-logo.webp",
      logoAlt: "Facebook",
      buttonLabel: "Leave a Facebook review",
    },
  ].filter((item) => item.href);
}
