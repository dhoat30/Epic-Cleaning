"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Input from "@/components/UI/Forms/InputFields/Input";
import LoadingBtn from "@/components/UI/Buttons/LoadingBtn";
import styles from "./ClientFeedbackPrivateForm.module.scss";

const initialFormData = {
  name: "",
  message: "",
};

const fieldDefinitions = [
  {
    id: "name",
    label: "Your name",
    type: "text",
    required: true,
    autoComplete: "name",
    errorMessage: "Please enter your name.",
  },
  {
    id: "message",
    label: "What happened, and how can we make it right?",
    type: "textarea",
    required: true,
    autoComplete: "off",
    errorMessage: "Please share a few details so we can help.",
  },
];

export default function ClientFeedbackPrivateForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [newSubmission, setNewSubmission] = useState(false);

  const handleChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: false }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    const payload = {
      formName: "Client Feedback - Private Feedback",
      message: buildEmailMessage(formData),
    };

    setIsLoading(true);
    setSubmitError(false);

    try {
      const mailResponse = await postJson("/api/sendmail", payload);

      if (!mailResponse.ok) {
        throw new Error("Feedback submission failed");
      }

      setIsLoading(false);
      setIsSuccess(true);
      setNewSubmission(false);
      setFormData(initialFormData);
      router.push("/form-submitted/thank-you");
    } catch (error) {
      setIsLoading(false);
      setIsSuccess(false);
      setSubmitError(true);
      setNewSubmission(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler} noValidate>
      <Box className={styles.formGrid}>
        {fieldDefinitions.map((field) => (
          <Input
            key={field.id}
            label={field.label}
            type={field.type}
            value={formData[field.id]}
            onChange={(event) => handleChange(field.id, event.target.value)}
            required={field.required}
            autoComplete={field.autoComplete}
            isInvalid={errors[field.id]}
            errorMessage={field.errorMessage}
          />
        ))}
      </Box>

      <LoadingBtn
        className={styles.submitButton}
        isLoading={isLoading}
        isSuccess={isSuccess}
        newSubmission={newSubmission}
        id="client-feedback-private-submit"
        type="submit"
      >
        Send feedback
      </LoadingBtn>

      {submitError ? (
        <Alert className={styles.alert} severity="error">
          Something went wrong while sending your feedback. Please try again.
        </Alert>
      ) : null}
    </form>
  );
}

function validateForm(formData) {
  const trimmedName = formData.name.trim();
  const trimmedMessage = formData.message.trim();

  return {
    name: !trimmedName,
    message: !trimmedMessage,
  };
}

function buildEmailMessage(formData) {
  return [
    `Name: ${formData.name.trim()}`,
    `Feedback: ${formData.message.trim()}`,
  ].join("\n");
}

async function postJson(url, payload) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
