"use client";

import React, { useState, useEffect } from "react";
import Input from './InputFields/Input'
import { getQuoteFormData } from "@/utils/getQuoteFormData";
import LoadingBtn from "../Buttons/LoadingBtn";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import styled from "@emotion/styled";
import axios from "axios";
import Alert from '@mui/material/Alert';


import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation'
import { calculateWebsitePrice } from "@/utils/calcultation/calculateWebsitePrice";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function GetQuoteForm({ className, formName = "Get a Quote Form", title = "Please fill out a form" }) {
    const router = useRouter()

    const [formData, setFormData] = useState({ typeOfService: [] });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [newSubmission, setNewSubmission] = useState(false)






    const handleChange = (id, value, isSelectMultiple) => {
        // Check if 'value' is an event object and handle accordingly
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
    // submit handler 
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission if using form tag

        let allFieldsValid = true;
        const newErrors = {};

        // Loop through each field to check if it's required and valid
        getQuoteFormData.forEach(field => {
            if (field.required && !formData[field.id]) {
                // Set field as invalid if it's required but empty or invalid
                newErrors[field.id] = true;
                allFieldsValid = false;
                return
            }
        });

        setErrors(newErrors);
        // If any required field is invalid, stop and don't make API calls
        if (!allFieldsValid) {
            return; // Stop the function if any field is invalid or empty
        }

        const dataPayload = {
            email: formData.email,
            formName: formName,
            message: `First Name: ${formData.firstname} \nEmail: ${formData.email} \nPhone Number: ${formData.phone} \nProperty Type: ${formData.propertyType} \nServices Required: ${formData['service'].join(", ")}  \n Message: ${formData.message} `,
            portalID: "145323047",
            hubspotFormID: "56669fff-b1f7-4aff-a297-42e71574dadc",
            hubspotFormObject: [
                {
                    name: "firstname",
                    value: formData.firstname
                },
                {
                    name: "email",
                    value: formData.email
                },
                {
                    name: "phone",
                    value: formData.phone
                },

                {
                    name: "propertyType",
                    value: formData.propertyType
                },
                {
                    name: "services_required",
                    value: formData['service'].join(", ")
                },
                {
                    name: "message",
                    value: formData.message
                },

            ]
        }
        setIsLoading(true)

        // Send an event to GA4 manually
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'quote_form_submission', // The custom event name you configured in GTM
                'event_category': 'form_submit',
                'event_label': 'Instant Quote From Submission'
            });
        }
        // hubspot config
        var configHubspot = {
            method: 'post',
            url: '/api/submit-hubspot-form',
            headers: { 'Content-Type': 'application/json' },
            data: dataPayload
        };
        // mailgun config
        var configSendMail = {
            method: 'post',
            url: '/api/sendmail',
            headers: { 'Content-Type': 'application/json' },
            data: dataPayload
        };
        console.log(formData)
        Promise.all([axios(configHubspot), axios(configSendMail)])
            .then(function (response) {
                console.log(response)
                if (response[1].status === 200) {
                    setIsLoading(false)
                    setIsSuccess(true)
                    setNewSubmission(false)
                    setError(false)
                    router.push('/form-submitted/thank-you')
                }
                else {
                    console.log(response)
                    setIsLoading(false)
                    setIsSuccess(false)
                    setError(true)
                    setNewSubmission(true)

                }
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false)
                setIsSuccess(false)
                setError(true)
                setNewSubmission(true)

            });
    }


    const formInputs = getQuoteFormData.map((field, index) => {
        const isSelectMultiple = field.type === "select" && field.multiple; // Example condition

        return <Input
            lightTheme={true}
            key={index}
            label={field.label}
            type={field.type}
            value={isSelectMultiple ? formData[field.id] || [] : formData[field.id] || ''}
            onChange={field.type === 'chip' ?
                (newValue) => handleChange(field.id, newValue, isSelectMultiple) :
                (e) => handleChange(field.id, e, isSelectMultiple)}

            onBlur={field.required ? () => handleBlur(field.id, field.validation) : null} //check if the field is required then call the function 
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
    })
    return (
        <>
            <ContainerStyled variant="div" className={`${className} py-8 `} maxWidth="xl">
                <Box sx={{ width: '100%' }}>
                    <React.Fragment>
                        <div className="input-wrapper p-6">
                            <Typography variant="h4" component="h1" className="title">
                                {title}
                            </Typography>
                            {formInputs}
                            <LoadingBtn newSubmission={newSubmission} onClick={submitHandler} isLoading={isLoading} isSuccess={isSuccess} >Submit now</LoadingBtn>

                            {error && <Alert sx={{ margin: "8px 0" }} severity='error'>Something went wrong. Please Try again</Alert>}
                        </div>
                    </React.Fragment>

                </Box>
            </ContainerStyled>


        </>

    )
}

const ContainerStyled = styled(Container)`
padding: 0 !important; 

.mobile-stepper{ 
    background: none; 
    padding:0;
    .MuiLinearProgress-root{ 
        width:100%;
        background: var(--light-primary-container); 
    }
}
.button-wrapper{ 
    display: flex;  
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; 
    gap: 8px; 
}
svg.Mui-active{ 
    color: #F9F871; 
}
svg.Mui-completed{ 
    color: #F9F871; 
}
svg.Mui-active{ 
 text{ 
    fill: black; 
 }
   
}
@media(max-width: 500px){ 
    .stepper-wrapper{ 
    display: none ;
}
}

.input-wrapper{ 
        padding: 24px 24px 24px 24px; 
    background: var(--light--surface-container);
border-radius: 12px; 
@media (max-width: 600px) {
        padding: 24px 16px;
      }
.title { 
    margin: 8px 0; 
}
    .Mui-error{ 
        font-size: 1rem;
    }
}
.quote-wrapper{ 
    background: var(--light--surface-container);
    border-radius: 12px; 
    max-width: 500px; 
    margin: 40px auto 0 auto;   
  
    .quote{ 
        max-width: 300px;
        margin: 16px auto; 
        padding: 16px 0; 
        border: dashed 2px var(--light-primary, #f9f871);
    }
}
`

