import { useState, useContext } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import LoadingBtn from '../Buttons/LoadingBtn';
import axios from 'axios';
import { Alert, Typography } from '@mui/material';
import FormDataContext from '@/context/googleSpeedData/FormDataContext';
import Button from '../Buttons/Button';

function PageSpeedForm({ emailTo, formName, emailRoute, btnLabel, className }) {
    // create state variables


    const { formData, setFormData } = useContext(FormDataContext);


    const [emailAddress, setEmailAddress] = useState("");
    const [emailAddressTouched, setEmailAddressTouched] = useState(false);

    const [webPageURL, setWebPageURL] = useState("");
    const [webPageUrlTouched, setWebPageUrlTouched] = useState(false);



    // ui states 
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [newSubmission, setNewSubmission] = useState(false)

    // email address validation
    var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    let emailAddressIsValid = pattern.test(emailAddress);
    const emailAddressIsInvalid = !emailAddressIsValid && emailAddressTouched;

    // web page url validation
    let webPageURLIsValid = webPageURL.trim().length > 2;
    const webPageURLIsInvalid = !webPageURLIsValid && webPageUrlTouched;

    // submit handler 
    const submitHandler = async () => {


        setEmailAddressTouched(true)
        setWebPageUrlTouched(true)

        if (!webPageURL || !emailAddress) {
            return
        }
        setFormData({})
        setError(false)
        const formData = {
            emailAddress: emailAddress,
            webPageURL: webPageURL,
        }

        setIsLoading(true)
        //success callback 
        // set global loading 
        setFormData(prevState => ({
            ...prevState,
            waitingData: true,
            isMobileDataSet: false,
            isDesktopDataSet: false

        }));

        // create contact ins hubspot 
        axios.post("/api/create-hubspot-contact", formData).then((res) => {
            // console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        try {

            const forms = {
                mobilePerformance: { ...formData, device: "mobile", category: "performance" },
                mobileSeo: { ...formData, device: "mobile", category: "seo" },
                mobileAccessibility: { ...formData, device: "mobile", category: "accessibility" },
                mobileBestPractices: { ...formData, device: "mobile", category: "best_practices" },
                desktopPerformance: { ...formData, device: "desktop", category: "performance" },
                desktopSeo: { ...formData, device: "desktop", category: "seo" },
                desktopAccessibility: { ...formData, device: "desktop", category: "accessibility" },
                desktopBestPractices: { ...formData, device: "desktop", category: "best_practices" },
            };
            // Send an event to GA4 manually
            if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'speed_form_submission', // The custom event name you configured in GTM
                    'event_category': 'form_submit',
                    'event_label': 'Speed Checker Form Submitted'
                });
            }
            // Mobile API Calls
            const mobileResponses = await Promise.all([
                axios.post("/api/google-page-speed", forms.mobilePerformance),
                axios.post("/api/google-page-speed", forms.mobileSeo),
                axios.post("/api/google-page-speed", forms.mobileAccessibility),
                axios.post("/api/google-page-speed", forms.mobileBestPractices),
            ]);
            const mobileData = mobileResponses.map(item => {
                if (!item.data.success) {
                    setError(true)
                    setFormData(prevState => ({
                        ...prevState,
                        mobileDataError: true
                    }));
                }
            })
            // Setting Mobile Data or Error
            setFormData(prevState => ({
                ...prevState,
                mobilePerformanceData: mobileResponses[0]?.status === 200 ? mobileResponses[0].data.data : { error: "Something went wrong. Please try again", code: 500 },
                mobileSeoData: mobileResponses[1]?.status === 200 ? mobileResponses[1].data.data : { error: "Something went wrong. Please try again", code: 500 },
                mobileAccessibilityData: mobileResponses[2]?.status === 200 ? mobileResponses[2].data.data : { error: "Something went wrong. Please try again", code: 500 },
                mobileBestPracticesData: mobileResponses[3]?.status === 200 ? mobileResponses[3].data.data : { error: "Something went wrong. Please try again", code: 500 },
                isMobileDataSet: true
            }));

            setIsLoading(false);
            setIsSuccess(true);
            setEmailAddressTouched(false);
            setWebPageUrlTouched(false);
            setNewSubmission(true);

            // Desktop API Calls
            const desktopResponses = await Promise.all([
                axios.post("/api/google-page-speed", forms.desktopPerformance),
                axios.post("/api/google-page-speed", forms.desktopSeo),
                axios.post("/api/google-page-speed", forms.desktopAccessibility),
                axios.post("/api/google-page-speed", forms.desktopBestPractices),
            ]);
            // check if any of the responses contains error 
            const desktopData = desktopResponses.map(item => {
                if (!item.data.success) {
                    setError(true)
                    setFormData(prevState => ({
                        ...prevState,
                        desktopDataError: true
                    }));
                }
            })
            // Setting Desktop Data or Error
            setFormData(prevState => ({
                ...prevState,
                desktopPerformanceData: desktopResponses[0]?.status === 200 ? desktopResponses[0].data.data : { error: "Something went wrong. Please try again", code: 500 },
                desktopSeoData: desktopResponses[1]?.status === 200 ? desktopResponses[1].data.data : { error: "Something went wrong. Please try again", code: 500 },
                desktopAccessibilityData: desktopResponses[2]?.status === 200 ? desktopResponses[2].data.data : { error: "Something went wrong. Please try again", code: 500 },
                desktopBestPracticesData: desktopResponses[3]?.status === 200 ? desktopResponses[3].data.data : { error: "Something went wrong. Please try again", code: 500 },
                waitingData: false,
                isDesktopDataSet: true
            }));


        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setIsSuccess(false);
            setError(true);
            setNewSubmission(false);
            // set global loading false
            setFormData(prevState => ({
                ...prevState,
                waitingData: false
            }));
            // You may set error in formData here if needed
            setFormData(prevState => ({ ...prevState, error: 'Your error message' }));
        }

    }


    return (
        <Container className={className}>
            <Typography
                sx={{
                    color: "var(--dark-on-surface, #C9C6BE)",
                    fontWeight: 500
                }}
                variant="h5" component="h1" >{formName} </Typography>
            <form className="form mt-8" id="speed-checker-form">

                <TextFieldStyle
                    onChange={(e) => setEmailAddress(e.target.value)}
                    onBlur={() => setEmailAddressTouched(true)}
                    value={emailAddress}
                    required
                    id="email-input"
                    label="Your email address"
                    variant="outlined"
                    name="email"
                    fullWidth
                    color="primary"
                    autoComplete="email"

                    helperText={emailAddressIsInvalid && "Please enter your email address"}
                    error={emailAddressIsInvalid}
                />

                <TextFieldStyle
                    sx={{ marginTop: '16px', marginBottom: '16px' }}
                    onChange={(e) => setWebPageURL(e.target.value)}
                    onBlur={() => setWebPageUrlTouched(true)}
                    value={webPageURL}
                    required
                    id="url-input"
                    label="Enter your web page url"
                    variant="outlined"
                    name="page-url"
                    fullWidth
                    color="primary"
                    helperText={webPageURLIsInvalid && "Please enter your web page url"}
                    error={webPageURLIsInvalid}
                />
                {error && <Alert sx={{ margin: "8px 0" }} severity='error'>Something went wrong. Please Try again</Alert>}


                <LoadingBtn newSubmission={newSubmission} label={btnLabel} onClick={submitHandler} isLoading={isLoading} isSuccess={isSuccess} />

                {/* {isSuccess && <Alert sx={{ margin: "8px 0" }} severity='success'>Thanks</Alert>} */}
            </form>

        </Container>
    )
}

export default PageSpeedForm
const Container = styled.div`
    .title{ 
        color: var(--light-on-surface-variant, #4C4639);
        font-weight: 400;
        letter-spacing: 2px; 
        font-size: var(--material-theme--display--large);
    }
    .subtitle{ 

    }
   
`

const LoadingBtnStyle = styled(LoadingBtn)`
   

`
const TextFieldStyle = styled(TextField)`
label { 
    color: var(--dark-on-surface-variant, #CEC6B4);

}
`