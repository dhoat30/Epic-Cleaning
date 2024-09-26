"use client";

import React, { useState } from "react";
import Input from './InputFields/Input'
import { quoteFormData } from "@/utils/quoteFormFieldsData";
import LoadingBtn from "../Buttons/LoadingBtn";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from "@emotion/styled";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Link from 'next/link'
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Container from '@mui/material/Container';

export default function GetQuoteForm({ className }) {
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [newSubmission, setNewSubmission] = useState(false)
    const [quote, setQuote] = useState({})

    // theme 
    const theme = useTheme();

    const handleNext = () => {

        // validate field on next click 
        const currentField = quoteFormData[activeStep];
        if (currentField.validation && !currentField.validation(formData[currentField.id])) {
            setFormErrors({ [currentField.id]: true });
        } else {
            setFormErrors({});
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // handle input change 
    const handleInputChange = (event, id) => {
        const newFormData = { ...formData, [id]: event.target.value };
        setFormData(newFormData);
    };

    // submit handler 
    const submitHandler = (e) => {

        // validate field on next click 
        const currentField = quoteFormData[activeStep];
        if (currentField.validation && !currentField.validation(formData[currentField.id])) {
            setFormErrors({ [currentField.id]: true });
        } else {
            setFormErrors({});
        }

        setIsLoading(true)
        // send email 
        var config = {
            method: 'post',
            url: '/api/get-quote',
            headers: {
                'Content-Type': 'application/json'
            },
            data: formData
        };
        // Send an event to GA4 manually
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'quote_form_submission', // The custom event name you configured in GTM
                'event_category': 'form_submit',
                'event_label': 'Instant Quote From Submission'
            });
        }
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setIsLoading(false)
                    setIsSuccess(true)
                    setNewSubmission(true)
                    // set initial state to empty string 
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    setError(false)
                    setQuote(response.data.price)
                }
                else {
                    console.log(response)
                    setIsLoading(false)
                    setIsSuccess(false)
                    setError(true)
                    setNewSubmission(false)

                }
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false)
                setIsSuccess(false)
                setError(true)
                setNewSubmission(false)

            });
    }
    const currentField = quoteFormData[activeStep];
    let dollarUSLocale = Intl.NumberFormat('en-US')
    return (
        <ContainerStyled variant="div" className={`${className} py-8 `} maxWidth="sm">

            <Box sx={{ width: '100%' }}>

                <MobileStepper
                    className="mobile-stepper"
                    variant="progress"
                    steps={quoteFormData.length + 1}
                    position="static"
                    activeStep={activeStep}
                />
                {activeStep === quoteFormData.length ? (
                    <React.Fragment>
                        <div className="quote-wrapper p-6">
                            <Typography variant="h5" sx={{ mb: 1, textAlign: "center" }}>
                                Your Quote
                            </Typography>
                            <div className="quote">
                                <Typography variant="h3" sx={{ mb: 1, textAlign: "center" }}>
                                    ${dollarUSLocale.format(quote)}
                                </Typography>
                            </div>

                            <Link href="/book-consultation"> <Button color="primary" variant="contained" sx={{ borderRadius: "50px", margin: "24px auto", display: 'block' }} size="large">Book Free Consultation </Button></Link>
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className="input-wrapper p-6">
                            <Input
                                lightTheme={true}
                                label={quoteFormData[activeStep].label}
                                type={quoteFormData[activeStep].type}
                                value={formData[currentField.id] || ''}
                                onChange={(e) => handleInputChange(e, quoteFormData[activeStep].id)}
                                onBlur={quoteFormData[activeStep].onBlur}
                                required={quoteFormData[activeStep].required}
                                autoComplete={quoteFormData[activeStep].autoComplete}
                                isInvalid={formErrors[currentField.id]}
                                errorMessage={quoteFormData[activeStep].errorMessage}
                                options={quoteFormData[activeStep].options}
                            />

                            <Box className="button-wrapper" sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="primary"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant="outlined"
                                    startIcon={<KeyboardArrowLeft />}
                                    size="large"
                                >
                                    Back
                                </Button>
                                {activeStep === quoteFormData.length - 1 ?
                                    <LoadingBtn newSubmission={newSubmission} onClick={submitHandler} isLoading={isLoading} isSuccess={isSuccess}>Submit</LoadingBtn>
                                    :
                                    <Button onClick={handleNext} color="primary" variant="outlined"
                                        endIcon={<KeyboardArrowRight />}
                                        size="large"
                                    >
                                        Next
                                    </Button>
                                }
                            </Box>
                            {error && <Alert sx={{ margin: "8px 0" }} severity='error'>Something went wrong. Please Try again</Alert>}
                        </div>
                    </React.Fragment>
                )}
            </Box>

        </ContainerStyled>
    )
}

const ContainerStyled = styled(Container)`
background: var(--light-surface-container) ;
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

