// components/GetQuoteForm.js

"use client";
import styles from "./GetQuoteForm.module.scss";

import React, { useState } from "react";
import Input from './InputFields/Input';
import { getQuoteFormData } from "@/utils/getQuoteFormData";
import { servicePropertyMap } from "@/utils/getQuoteFormData"; // Import the service mapping
import LoadingBtn from "../Buttons/LoadingBtn";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import Typography from "@mui/material/Typography";
import GoogleMapsLoader from "@/components/GoogleMaps/GoogleMapsLoader";
import GoogleAutocomplete from "@/components/GoogleMaps/GoogleAutoComplete";

export default function GetQuoteForm({ className, formName = "Get a Quote Form", title = "Please fill out a form" }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstname: '',   // Default empty string to make it controlled
        email: '',
        phone: '',
        propertyType: '',
        service: [],
        date: null,

        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [newSubmission, setNewSubmission] = useState(false);
    const [mapsLoaded, setMapsLoaded] = useState(false);

    const handleChange = (id, value, isSelectMultiple) => {
        let newValue = value.target ? value.target.value : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: newValue,
        }));

        // Reset errors on change
        if (errors[id]) {
            setErrors({ ...errors, [id]: false });
        }
    };

    const handleBlur = (id, validationFunction) => {
        if (!validationFunction(formData[id])) {
            setErrors({ ...errors, [id]: true });
        }
    };
    // Initialize Google Maps script
    const handleLoad = () => {
        setMapsLoaded(true);
    };
    const handleSelectAddress = (selectedAddress) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            address: selectedAddress,
        }));
        if (errors.address) {
            setErrors({ ...errors, address: false });
        }
    };
    // Submit handler 
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission if using form tag

        let allFieldsValid = true;
        const newErrors = {};

        // Loop through each field to check if it's required and valid
        getQuoteFormData.forEach(field => {
            if (field.required) {
                if (field.type === 'chip') {
                    if (!formData[field.id] || formData[field.id].length === 0) {
                        newErrors[field.id] = true;
                        allFieldsValid = false;
                    }
                } else if (!formData[field.id] || !field.validation(formData[field.id])) {
                    newErrors[field.id] = true;
                    allFieldsValid = false;
                }
            }
        });

        setErrors(newErrors);
        // If any required field is invalid, stop and don't make API calls
        if (!allFieldsValid) {
            return; // Stop the function if any field is invalid or empty
        }
        // let formattedDate = dayjs(formData.datePicker).format('DD/MM/YYYY HH:mm')
   
        const dataPayload = {
            email: formData.email,
            formName: formName,
            message: `First Name: ${formData.firstname} \nEmail: ${formData.email} \nPhone Number: ${formData.phone} \nProperty Address: ${formData.address} \nProperty Type: ${formData.propertyType} \nServices Required: ${formData['service'].join(", ")}  \n Message: ${formData.message} `,
            portalID: "145323047",
            hubspotFormID: "56669fff-b1f7-4aff-a297-42e71574dadc",
            hubspotFormObject: [
                { name: "firstname", value: formData.firstname },
                { name: "email", value: formData.email },
                { name: "phone", value: formData.phone },
                { name: "propertyType", value: formData.propertyType },
                { name: "services_required", value: formData['service'].join(", ") },
                             { name: "address", value: formData.address },

                { name: "message", value: formData.message },
            ]
        };

        setIsLoading(true);

        // Send an event to GA4 manually
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'quote_form_submission', // The custom event name you configured in GTM
                'event_category': 'form_submit',
                'event_label': 'Instant Quote From Submission'
            });
        }

        // Hubspot config
        var configHubspot = {
            method: 'post',
            url: '/api/submit-hubspot-form',
            headers: { 'Content-Type': 'application/json' },
            data: dataPayload
        };
        // Mailgun config
        var configSendMail = {
            method: 'post',
            url: '/api/sendmail',
            headers: { 'Content-Type': 'application/json' },
            data: dataPayload
        };

        Promise.all([axios(configHubspot), axios(configSendMail)])
            .then(function (response) {
                if (response[1].status === 200) {
                    setIsLoading(false);
                    setIsSuccess(true);
                    setNewSubmission(false);
                    setError(false);
                    router.push('/form-submitted/thank-you');
                }
                else {
                    setIsLoading(false);
                    setIsSuccess(false);
                    setError(true);
                    setNewSubmission(true);
                }
            })
            .catch(function (error) {
                setIsLoading(false);
                setIsSuccess(false);
                setError(true);
                setNewSubmission(true);
            });
    };

    // Get the filtered service options based on propertyType
    const getFilteredServiceOptions = () => {
        if (formData.propertyType && servicePropertyMap[formData.propertyType]) {
            return servicePropertyMap[formData.propertyType];
        }
        return [];
    };

    const formInputs = getQuoteFormData.map((field, index) => {
        if (field.id === 'service') {
            const filteredOptions = getFilteredServiceOptions();
            return (
                <Input
                    lightTheme={true}
                    key={index}
                    label={field.label}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={(newValue) => handleChange(field.id, newValue, field.multiple)}
                    onBlur={field.required ? () => handleBlur(field.id, field.validation) : null}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    isInvalid={errors[field.id]}
                    errorMessage={field.errorMessage}
                    options={filteredOptions}
                    multipleValue={field.multiple}
                />
            );
        } 
        else if (field.id === 'address') {
            return (
                <React.Fragment key={field.id}> 
                    {!mapsLoaded && <GoogleMapsLoader onLoad={handleLoad} key="google-maps-loader" />}
                    {mapsLoaded && (
                        <GoogleAutocomplete
                            className="mb-16"
                        label={field.label}
                            value={formData.address}
                            onChange={(value) => handleChange(field.id, value, false)}
                            onSelect={handleSelectAddress}
                            required={field.required}
                            autoComplete={field.autoComplete}
                            error={errors[field.id]}
                            helperText={errors[field.id] ? 'Please enter a valid address' : ''}
                        />
                    )}
                </React.Fragment>
            );
        } 
        else {
            return (
                <Input
                    lightTheme={true}
                    key={index}
                    label={field.label}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={field.type === 'chip' ?
                        (newValue) => handleChange(field.id, newValue, field.multiple) :
                        (e) => handleChange(field.id, e, field.multiple)}
                    onBlur={field.required ? () => handleBlur(field.id, field.validation) : null}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    isInvalid={errors[field.id]}
                    errorMessage={field.errorMessage}
                    options={field.options}
                    multipleValue={field.multiple}
                    min={field.range && field.range.min}
                    max={field.range && field.range.max}
                    note={field.note && field.note}
                />
            );
        }
    });

    return (
        <>
            <ContainerStyled variant="div" className={`${className}`} maxWidth="xl">
                <Box className={styles.fullWidth}>
                    <React.Fragment>
                        <div className="input-wrapper ">
                        
                            {formInputs}
                            <LoadingBtn newSubmission={newSubmission} onClick={submitHandler} isLoading={isLoading} isSuccess={isSuccess}>
                                Submit now
                            </LoadingBtn>
                            {error && <Alert className="my-8" severity='error'>Something went wrong. Please Try again</Alert>}
                        </div>
                    </React.Fragment>
                </Box>
            </ContainerStyled>
        </>
    );
}

const ContainerStyled = ({ className = "", ...props }) =>
  React.createElement(Container, {
    ...props,
    className: `${styles.containerStyled} ${className}`.trim(),
  });
