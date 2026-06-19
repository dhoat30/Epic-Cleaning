"use client";

import React, { useMemo, useState } from "react";
import styles from "./CommercialCleaningQuotePage.module.scss";
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
import { useRouter } from "next/navigation";
import GoogleMapsLoader from "@/components/GoogleMaps/GoogleMapsLoader";
import GoogleAutocomplete from "@/components/GoogleMaps/GoogleAutoComplete";
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
const initialFormData = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  company: "",
  businessType: "Office",
  frequency: "Daily",
  address: "",
  message: "",
};

const businessTypes = [
  "Office",
  "Restaurant / cafe",
  "Retail",
  "Medical / healthcare",
  "School / childcare",
  "Industrial / warehouse",
  "Hospitality",
  "Other",
];

const frequencies = [
  "Daily",
  "Several times a week",
  "Weekly",
  "Fortnightly",
  "Monthly",
  "One-off deep clean",
  "Not sure yet",
];

// const fieldSx = {
//   "& .MuiInputLabel-root": {
//     color: "var(--light-primary)",
//     fontFamily: "var(--font-montserrat), Segoe UI, sans-serif",
//     fontWeight: 800,
//   },
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "8px",
//     backgroundColor: "var(--light-surface-container-lowest)",
//     fontFamily: "var(--font-inter), Segoe UI, sans-serif",
//     "& fieldset": {
//       borderColor: "var(--light-outline-variant)",
//     },
//     "&:hover fieldset": {
//       borderColor: "var(--light-primary)",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "var(--light-primary)",
//       borderWidth: "1px",
//     },
//   },
//   "& .MuiFormHelperText-root": {
//     marginLeft: 0,
//     fontFamily: "var(--font-inter), Segoe UI, sans-serif",
//   },
// };

export default function CommercialCleaningQuoteForm({ phoneNumber }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [shouldLoadMaps, setShouldLoadMaps] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  const phoneHref = useMemo(
    () => phoneNumber?.replace(/[^\d+]/g, ""),
    [phoneNumber]
  );

  const errors = useMemo(() => validateForm(formData), [formData]);

  const showError = (field) => Boolean(touched[field] && errors[field]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));
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

  const submitHandler = async (event) => {
    event.preventDefault();
    setSubmitError("");

    const validationErrors = validateForm(formData);
    const requiredFields = ["firstname", "lastname", "email"];

    if (requiredFields.some((field) => validationErrors[field])) {
      setTouched((current) => ({
        ...current,
        firstname: true,
        lastname: true,
        email: true,
      }));
      return;
    }

    const message = buildEmailMessage(formData);
    const dataPayload = {
      email: formData.email,
      formName: "Commercial Cleaning Quote Landing Page",
      message,
      portalID: "145323047",
      hubspotFormID: "56669fff-b1f7-4aff-a297-42e71574dadc",
      hubspotFormObject: [
        { name: "firstname", value: formData.firstname },
        { name: "lastname", value: formData.lastname },
        { name: "email", value: formData.email },
        { name: "phone", value: formData.phone },
        { name: "company", value: formData.company },
        { name: "address", value: formData.address },
        { name: "message", value: message },
      ],
    };

    setIsSubmitting(true);

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "commercial_cleaning_quote_submission",
        event_category: "form_submit",
        event_label: "Commercial Cleaning Quote Landing Page",
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
    <form className={`${styles.form} gap-16 grid`} onSubmit={submitHandler} noValidate>
      <div className={styles.formGrid}>
        <TextField
          label="First name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={showError("firstname")}
          helperText={showError("firstname") ? errors.firstname : ""}
          autoComplete="given-name"
          
        />
        <TextField
          label="Last name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={showError("lastname")}
          helperText={showError("lastname") ? errors.lastname : ""}
          autoComplete="family-name"
          
        />
      </div>

      <TextField
        label="Email address"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        error={showError("email")}
        helperText={showError("email") ? errors.email : ""}
        autoComplete="email"
        
      />

      <div className={styles.formGrid}>
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          
        />
        <TextField
          label="Business name"
          name="company"
          value={formData.company}
          onChange={handleChange}
          autoComplete="organization"
          
        />
      </div>

      <TextField
        select
        label="Type of business"
        name="businessType"
        value={formData.businessType}
        onChange={handleChange}
        
      >
        {businessTypes.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="How often do you need cleaning?"
        name="frequency"
        value={formData.frequency}
        onChange={handleChange}
        
      >
        {frequencies.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {shouldLoadMaps && !mapsLoaded && (
        <GoogleMapsLoader onLoad={() => setMapsLoaded(true)} />
      )}
      {mapsLoaded ? (
        <GoogleAutocomplete
          label="Site address"
          value={formData.address}
          onChange={handleAddressChange}
          onSelect={handleSelectAddress}
          autoComplete="street-address"
        />
      ) : (
        <TextField
          label="Site address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onFocus={() => setShouldLoadMaps(true)}
          autoComplete="street-address"
        />
      )}

      <TextField
        label="Anything else we should know?"
        name="message"
        value={formData.message}
        onChange={handleChange}
        multiline
        minRows={3}
        
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        className={styles.submitButton}
        disabled={isSubmitting}
        endIcon={
          isSubmitting ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <ArrowForwardRoundedIcon />
          )
        }
      >
        Get my free quote
      </Button>

      <div className={styles.privacyNote}>
        <LockOutlinedIcon aria-hidden="true" />
        <span>Your details are never shared. No spam, ever.</span>
      </div>

      {submitError && <Alert severity="error">{submitError}</Alert>}

      {phoneNumber && (
        <>
          <div className={styles.orDivider}>
            <span>OR</span>
          </div>
          <Button
            component="a"
            href={`tel:${phoneHref}`}
            type="button"
            variant="text"
            size="large"
          >
            <PhoneRoundedIcon aria-hidden="true" /> Call now: {phoneNumber}
          </Button>
       
        </>
      )}

      <div className={styles.formTrustList}>
        <span>
          <GppGoodOutlinedIcon aria-hidden="true" />
          $5M insured
        </span>
        <span>
          <VerifiedOutlinedIcon aria-hidden="true" />
          IICRC certified
        </span>
        <span>
          <AccessTimeRoundedIcon aria-hidden="true" />
          24hr response
        </span>
      </div>
    </form>
  );
}

function validateForm(formData) {
  const errors = {};

  if (!formData.firstname.trim()) {
    errors.firstname = "Please enter your first name.";
  }

  if (!formData.lastname.trim()) {
    errors.lastname = "Please enter your last name.";
  }

  if (!formData.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
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

function buildEmailMessage(formData) {
  return [
    `First Name: ${formData.firstname}`,
    `Last Name: ${formData.lastname}`,
    `Email: ${formData.email}`,
    `Phone Number: ${formData.phone || "Not provided"}`,
    `Business Name: ${formData.company || "Not provided"}`,
    `Type of Business: ${formData.businessType || "Not provided"}`,
    `Cleaning Frequency: ${formData.frequency || "Not provided"}`,
    `Site Address: ${formData.address || "Not provided"}`,
    `Message: ${formData.message || "Not provided"}`,
  ].join("\n");
}
