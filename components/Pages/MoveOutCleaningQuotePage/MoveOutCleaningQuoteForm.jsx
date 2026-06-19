"use client";

import React, { useEffect, useMemo, useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import { useRouter } from "next/navigation";
import GoogleMapsLoader from "@/components/GoogleMaps/GoogleMapsLoader";
import GoogleAutocomplete from "@/components/GoogleMaps/GoogleAutoComplete";
import styles from "./MoveOutCleaningQuotePage.module.scss";

const initialFormData = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  serviceType: "",
  bedrooms: "",
  bathrooms: "",
  carpetRooms: "",
  address: "",
  preferredDate: "",
  message: "",
};

const initialTracking = {
  landingPage: "",
  gclid: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmTerm: "",
  utmContent: "",
};

const serviceTypes = [
  "Move-out clean + carpet shampoo",
  "Move-out clean only",
  "Move-in clean",
  "Carpet shampoo only",
  "Not sure yet",
];

const bedroomOptions = [
  "Studio / 1 bedroom",
  "2 bedrooms",
  "3 bedrooms",
  "4 bedrooms",
  "5+ bedrooms",
];

const bathroomOptions = [
  "1 bathroom",
  "2 bathrooms",
  "3 bathrooms",
  "4+ bathrooms",
];

const carpetRoomOptions = [
  "No carpet shampoo",
  "1 carpeted room",
  "2 carpeted rooms",
  "3 carpeted rooms",
  "4 carpeted rooms",
  "5+ carpeted rooms",
  "Not sure yet",
];

const formSteps = [
  {
    label: "Job details",
    description: "Cleaning type and property size",
  },
  {
    label: "Property",
    description: "Address, date, and access notes",
  },
  {
    label: "Contact details",
    description: "Where we should send the quote",
  },
];

const fieldSx = {
  "& .MuiInputLabel-root": {
    color: "var(--light-primary)",

  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "var(--light-surface-container-lowest)",
    fontFamily: 'var(--font-inter), "Segoe UI", sans-serif',
    "& fieldset": {
      borderColor: "var(--light-outline-variant)",
    },
    "&:hover fieldset": {
      borderColor: "var(--light-primary)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--light-secondary)",
      borderWidth: "1px",
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    fontFamily: 'var(--font-inter), "Segoe UI", sans-serif',
  },
};

export default function MoveOutCleaningQuoteForm({ phoneNumber }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [tracking, setTracking] = useState(initialTracking);
  const [fieldErrors, setFieldErrors] = useState({});
  const [contactStepSession, setContactStepSession] = useState(0);
  const [validatedContactStepSession, setValidatedContactStepSession] =
    useState(-1);
  const [isContactValidationArmed, setIsContactValidationArmed] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [shouldLoadMaps, setShouldLoadMaps] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setTracking({
      landingPage: window.location.href,
      gclid: params.get("gclid") || "",
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmTerm: params.get("utm_term") || "",
      utmContent: params.get("utm_content") || "",
    });
  }, []);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const phoneHref = useMemo(
    () => phoneNumber?.replace(/[^\d+]/g, ""),
    [phoneNumber]
  );
  const isLastStep = currentStep === formSteps.length - 1;
  const progressValue = ((currentStep + 1) / formSteps.length) * 100;
  const hasSubmittedCurrentContactStep =
    isContactValidationArmed &&
    validatedContactStepSession === contactStepSession;

  const resetContactValidation = () => {
    setFieldErrors({});
    setValidatedContactStepSession(-1);
    setIsContactValidationArmed(false);
    setContactStepSession((session) => session + 1);
  };

  useEffect(() => {
    if (currentStep === formSteps.length - 1) {
      resetContactValidation();
    }
  }, [currentStep]);

  const getVisibleFieldError = (field) => {
    if (!hasSubmittedCurrentContactStep) {
      return "";
    }

    return fieldErrors[field] || "";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (fieldErrors[name] || hasSubmittedCurrentContactStep) {
      const nextError = validateContactField(name, value);

      setFieldErrors((current) => ({
        ...current,
        [name]: nextError,
      }));
    }
  };

  const handleAddressChange = (value) => {
    setFormData((current) => ({
      ...current,
      address: value,
    }));
  };

  const handleSelectAddress = (selectedAddress) => {
    setFormData((current) => ({
      ...current,
      address: selectedAddress,
    }));
  };

  const handleNextStep = () => {
    const nextStep = Math.min(currentStep + 1, formSteps.length - 1);

    if (nextStep === formSteps.length - 1 && currentStep !== nextStep) {
      resetContactValidation();
    }

    setCurrentStep(nextStep);
  };

  const handleBackStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!isLastStep) {
      handleNextStep();
      return;
    }

    const validationErrors = validateContactFields(formData);
    setIsContactValidationArmed(true);
    setValidatedContactStepSession(contactStepSession);

    if (Object.keys(validationErrors).length) {
      setFieldErrors(validationErrors);
      setCurrentStep(formSteps.length - 1);
      return;
    }

    const message = buildEmailMessage(formData, tracking);
    const dataPayload = {
      email: formData.email,
      formName: "Move-Out Cleaning Quote Landing Page",
      message,
      portalID: "145323047",
      hubspotFormID: "56669fff-b1f7-4aff-a297-42e71574dadc",
      hubspotFormObject: [
        { name: "firstname", value: formData.firstname },
        { name: "lastname", value: formData.lastname },
        { name: "email", value: formData.email },
        { name: "phone", value: formData.phone },
        { name: "propertyType", value: "Residential" },
        {
          name: "services_required",
          value: `${formData.serviceType} | ${formData.carpetRooms}`,
        },
        { name: "address", value: formData.address },
        { name: "message", value: message },
      ],
    };

    setIsSubmitting(true);

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "move_out_cleaning_quote_submission",
        event_category: "form_submit",
        event_label: "Move-Out Cleaning Quote Landing Page",
      });
    }

    try {
      const [hubspotResponse, emailResponse] = await Promise.all([
        postJson("/api/submit-hubspot-form", dataPayload),
        postJson("/api/sendmail", dataPayload),
      ]);

      if (hubspotResponse.data?.success && emailResponse.data?.success) {
        router.push("/form-submitted/thank-you");
        return;
      }

      setSubmitError("Something went wrong. Please try again or call us directly.");
    } catch (error) {
      setSubmitError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={`${styles.form} grid gap-16`} onSubmit={submitHandler} noValidate>
      <div className={`${styles.stepProgress} grid gap-12 mb-16`}>
        <div className={`${styles.stepMeta} `}>
          <span>{`Step ${currentStep + 1} of ${formSteps.length}`}</span>
          <strong>{formSteps[currentStep].label}</strong>
          <p>{formSteps[currentStep].description}</p>
        </div>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuenow={Math.round(progressValue)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Quote form progress"
        >
          <span style={{ width: `${progressValue}%` }} />
        </div>
      </div>

      {currentStep === 0 && (
        <div className={`${styles.stepPanel} grid gap-16`}>
          <TextField
            select
            label="Cleaning service"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            sx={fieldSx}
          >
            <MenuItem value="" disabled>
              Select cleaning service
            </MenuItem>
            {serviceTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <div className={`${styles.formGrid} grid gap-16`}>
            <TextField
              select
              label="Bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              sx={fieldSx}
            >
              <MenuItem value="" disabled>
                Select bedrooms
              </MenuItem>
              {bedroomOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              sx={fieldSx}
            >
              <MenuItem value="" disabled>
                Select bathrooms
              </MenuItem>
              {bathroomOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <TextField
            select
            label="Carpet shampoo"
            name="carpetRooms"
            value={formData.carpetRooms}
            onChange={handleChange}
            sx={fieldSx}
          >
            <MenuItem value="" disabled>
              Select carpet shampoo
            </MenuItem>
            {carpetRoomOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
      )}

      {currentStep === 1 && (
        <div className={`${styles.stepPanel} grid gap-16`}>
          {shouldLoadMaps && !mapsLoaded && (
            <GoogleMapsLoader onLoad={() => setMapsLoaded(true)} />
          )}
          {mapsLoaded ? (
            <GoogleAutocomplete
              label="Property address or suburb"
              value={formData.address}
              onChange={handleAddressChange}
              onSelect={handleSelectAddress}
              autoComplete="street-address"
              className={styles.addressField}
            />
          ) : (
            <TextField
              label="Property address or suburb"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onFocus={() => setShouldLoadMaps(true)}
              autoComplete="street-address"
              sx={fieldSx}
            />
          )}

          <TextField
            label="Preferred cleaning date"
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: today }}
            sx={fieldSx}
          />

          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            minRows={3}
            sx={fieldSx}
          />
        </div>
      )}

      {currentStep === 2 && (
        <div
          key={`contact-step-${contactStepSession}`}
          className={`${styles.stepPanel} grid gap-16`}
        >
          <div className={`${styles.formGrid} grid gap-16`}>
            <TextField
              label="First name *"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              error={Boolean(getVisibleFieldError("firstname"))}
              helperText={getVisibleFieldError("firstname")}
              autoComplete="given-name"
              sx={fieldSx}
            />

            <TextField
              label="Last name *"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              error={Boolean(getVisibleFieldError("lastname"))}
              helperText={getVisibleFieldError("lastname")}
              autoComplete="family-name"
              sx={fieldSx}
            />
          </div>

          <TextField
            label="Email address *"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(getVisibleFieldError("email"))}
            helperText={getVisibleFieldError("email")}
            autoComplete="email"
            sx={fieldSx}
          />

          <TextField
            label="Phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={Boolean(getVisibleFieldError("phone"))}
            helperText={getVisibleFieldError("phone")}
            autoComplete="tel"
            sx={fieldSx}
          />
        </div>
      )}

      <div className={styles.stepActions}>
        {currentStep > 0 && (
          <Button
            type="button"
            variant="outlined"
            size="large"
            onClick={handleBackStep}
            disabled={isSubmitting}
          >
            Back
          </Button>
        )}

        {!isLastStep ? (
          <Button
            type="button"
            variant="contained"
            size="large"
            onClick={handleNextStep}
        
          >
            Continue <ArrowForwardRoundedIcon />
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            size="large"
         
            disabled={isSubmitting}
         
          >
          Submit {
              isSubmitting ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <ArrowForwardRoundedIcon />
              )
            } 
          </Button>
        )}
      </div>

      {isLastStep && (
        <div className={styles.privacyNote}>
          <LockOutlinedIcon aria-hidden="true" />
          <span>Your details are private. No spam, ever.</span>
        </div>
      )}

      {submitError && <Alert severity="error">{submitError}</Alert>}

      {phoneNumber && (
        <div className={styles.phonePrompt}>
          <span>Prefer to talk?</span>
          <Button
            component="a"
            href={`tel:${phoneHref}`}
            type="button"
            variant="text"
            size="small"
            className={styles.phoneButton}
          >
            <PhoneRoundedIcon aria-hidden="true" /> {phoneNumber}
          </Button>
        </div>
      )}

      <div className={`${styles.formTrustList} flex flex-wrap justify-center gap-16`}>
        <span>
          <GppGoodOutlinedIcon aria-hidden="true" />
          $10M insured
        </span>
        <span>
          <VerifiedOutlinedIcon aria-hidden="true" />
          IICRC certified
        </span>
        <span>
          <AccessTimeRoundedIcon aria-hidden="true" />
          Fast response
        </span>
      </div>
    </form>
  );
}

function validateContactFields(formData) {
  const errors = {};

  ["firstname", "lastname", "email", "phone"].forEach((field) => {
    const error = validateContactField(field, formData[field]);

    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}

function validateContactField(field, value = "") {
  const trimmedValue = value.trim();

  if (field === "firstname" && !trimmedValue) {
    return "Please enter your first name.";
  }

  if (field === "lastname" && !trimmedValue) {
    return "Please enter your last name.";
  }

  if (field === "email") {
    if (!trimmedValue) {
      return "Please enter your email address.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
      return "Please enter a valid email address.";
    }
  }

  if (field === "phone" && trimmedValue) {
    const digits = trimmedValue.replace(/[^\d]/g, "");

    if (digits.length < 7) {
      return "Please enter a valid phone number.";
    }
  }

  return "";
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

function buildEmailMessage(formData, tracking) {
  const rows = [
    `First Name: ${formData.firstname}`,
    `Last Name: ${formData.lastname}`,
    `Email: ${formData.email}`,
    `Phone Number: ${formData.phone || "Not provided"}`,
    `Service Required: ${formData.serviceType}`,
    `Bedrooms: ${formData.bedrooms}`,
    `Bathrooms: ${formData.bathrooms}`,
    `Carpet Shampoo: ${formData.carpetRooms}`,
    `Property Address/Suburb: ${formData.address || "Not provided"}`,
    `Preferred Cleaning Date: ${formData.preferredDate || "Not provided"}`,
    `Message: ${formData.message || "Not provided"}`,
    "",
    "Lead Tracking:",
    `Landing Page: ${tracking.landingPage || "Not captured"}`,
    `GCLID: ${tracking.gclid || "Not captured"}`,
    `UTM Source: ${tracking.utmSource || "Not captured"}`,
    `UTM Medium: ${tracking.utmMedium || "Not captured"}`,
    `UTM Campaign: ${tracking.utmCampaign || "Not captured"}`,
    `UTM Term: ${tracking.utmTerm || "Not captured"}`,
    `UTM Content: ${tracking.utmContent || "Not captured"}`,
  ];

  return rows.join("\n");
}
