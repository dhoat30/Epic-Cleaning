"use client";

import React, { useState } from "react";
import Input from './InputFields/Input'
import { websiteEnquiryFieldsData } from "@/utils/websiteEnquiryFieldsData";
import LoadingBtn from "../Buttons/LoadingBtn";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import styled from "@emotion/styled";
import axios from "axios";
import Alert from '@mui/material/Alert';

import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation'
import dynamic from "next/dynamic";

export default function WebsiteInquiryLongForm({ className, formName = "Website Enquiry Form" }) {
    const router = useRouter()

    const [formData, setFormData] = useState({ typeOfService: [], formName: "Contact Form" });
    const [errors, setErrors] = useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [newSubmission, setNewSubmission] = useState(false)

    const handleChange = (id, value, isSelectMultiple) => {
        let updatedValue = value;


        setFormData({ ...formData, [id]: updatedValue });
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
        websiteEnquiryFieldsData.forEach(field => {
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
            message: `First Name: ${formData.firstname} \n Email: ${formData.email} \n What is your web design requirement?: ${formData['what_is_your_web_design_requirement_']} \n What are your website needs?: ${formData['what_are_your_website_needs_']} \n What type of business is this for?: ${formData['what_type_of_business_is_this_for_']} \n What industry do you operate in?: ${formData['industry']} \n When would you like the website to go live?: ${formData['project_timeline']} \n What is your estimated budget for this project?: ${formData['budget']} `,
            portalID: "22260883",
            hubspotFormID: "56d1d0d8-5a08-4bc6-99eb-b953c4d941c8",
            hubspotFormObject: [
                {
                    name: "firstname",
                    value: formData.firstname
                },
                {
                    name: "email",
                    value: formData.email
                }, {
                    name: "what_is_your_web_design_requirement_",
                    value: formData['what_is_your_web_design_requirement_']
                },
                {
                    name: "what_are_your_website_needs_",
                    value: formData['what_are_your_website_needs_']
                },
                {
                    name: "what_type_of_business_is_this_for_",
                    value: formData['what_type_of_business_is_this_for_']
                },
                {
                    name: "industry",
                    value: formData['industry']
                },
                {
                    name: "project_timeline",
                    value: formData['project_timeline']
                },
                {
                    name: "budget",
                    value: formData.budget
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

        Promise.all([axios(configHubspot), axios(configSendMail)])
            .then(function (response) {
                if (response[1].status === 200) {
                    setIsLoading(false)
                    setIsSuccess(true)
                    setNewSubmission(false)
                    setError(false)
                    // set initial state to empty string 
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    router.push('/website-enquiry/thank-you')
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


    const formInputs = websiteEnquiryFieldsData.map((field, index) => {
        const isSelectMultiple = field.type === "select" && field.multiple; // Example condition

        return <Input
            lightTheme={true}
            key={index}
            label={field.label}
            type={field.type}
            value={isSelectMultiple ? formData[field.id] || [] : formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value, isSelectMultiple)}
            onBlur={field.required ? () => handleBlur(field.id, field.validation) : null} //check if the field is required then call the function 
            required={field.required}
            autoComplete={field.autoComplete}
            isInvalid={errors[field.id]}
            errorMessage={field.errorMessage}
            options={field.options}
            multipleValue={field.multiple}

        />
    })
    return (
        <ContainerStyled variant="div" className={`${className} py-8 `} maxWidth="xl">

            <Box sx={{ width: '100%' }}>


                <React.Fragment>
                    <div className="input-wrapper p-6">
                        {formInputs}
                        <LoadingBtn newSubmission={newSubmission} onClick={submitHandler} isLoading={isLoading} isSuccess={isSuccess} >Submit now</LoadingBtn>

                        {error && <Alert sx={{ margin: "8px 0" }} severity='error'>Something went wrong. Please Try again</Alert>}
                    </div>
                </React.Fragment>

            </Box>

        </ContainerStyled>
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
        padding: 0 24px 24px 24px; 
    background: var(--light--surface-container);
border-radius: 12px; 
    @media(max-width: 600px){ 
        padding: 0 16px 24px 16px; 

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

