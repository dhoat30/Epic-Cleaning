import { useState } from 'react'
import styled from '@emotion/styled';
import LoadingBtn from '../Buttons/LoadingBtn';
import axios from 'axios';
import dynamic from "next/dynamic";

const TextField = dynamic(() => import("@mui/material/TextField"), {
    ssr: false,
});
const Alert = dynamic(() => import("@mui/material/Alert"), {
    ssr: false,
});
function NewsletterForm({ emailTo, formName, emailRoute, btnLabel, className }) {
    // create state variables


    const [emailAddress, setEmailAddress] = useState("");
    const [emailAddressTouched, setEmailAddressTouched] = useState(false);


    // ui states 
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(false)



    // email address validation
    var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    let emailAddressIsValid = pattern.test(emailAddress);
    const emailAddressIsInvalid = !emailAddressIsValid && emailAddressTouched;

    // submit handler 
    const submitHandler = () => {


        setEmailAddressTouched(true)


        if (!emailAddress) {
            return
        }


        const formData = {
            emailAddress: emailAddress,
        }
        setIsLoading(true)

        // send email 
        var config = {
            method: 'post',
            url: `${emailRoute}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: formData
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setIsLoading(false)
                    setIsSuccess(true)
                    // set initial state to empty string 

                    setEmailAddress('')


                    setEmailAddressTouched(false)

                }
                else {
                    setIsLoading(false)
                    setIsSuccess(false)
                    setError(true)
                }
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false)
                setIsSuccess(false)
                setError(true)

            });
    }


    return (
        <Container className={className}>
            <form className="form mt-8" >
                <TextFieldStyle
                    onChange={(e) => setEmailAddress(e.target.value)}
                    onBlur={() => setEmailAddressTouched(true)}
                    value={emailAddress}
                    required
                    id="email-input"
                    label="Email"
                    variant="outlined"
                    name="email"
                    fullWidth
                    color="secondary"
                    autoComplete="email"
                    helperText={emailAddressIsInvalid && "Please enter your email address"}
                    error={emailAddressIsInvalid}
                />

                {error && <Alert sx={{ margin: "8px 0" }} severity='error'>Try again</Alert>}


                <LoadingBtn align="left" onClick={submitHandler} isLoading={isLoading} isSuccess={isSuccess} >{btnLabel}</LoadingBtn>
                {isSuccess && <Alert sx={{ margin: "8px 0" }} severity='success'>Thanks</Alert>}
            </form>

        </Container>
    )
}

export default NewsletterForm
const Container = styled.div`
min-height: 114px !important; 
    .title{ 
        color: var(--light-on-surface-variant, #4C4639);
        font-weight: 400;
        letter-spacing: 2px; 
        font-size: var(--material-theme--display--large);
    }
`

const LoadingBtnStyle = styled(LoadingBtn)`
    display: block; 
    width: 100%; 

`
const TextFieldStyle = styled(TextField)`
width: 100% !important; 

label { 
    color: var(--dark-on-surface-variant, #CEC6B4);

}
`