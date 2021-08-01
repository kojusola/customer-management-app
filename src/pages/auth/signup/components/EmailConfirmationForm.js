import React from "react";
import BnLogo from "assets/icons/faviconPinInput.svg";
import PinLogo from "assets/images/pin-input.svg";
import PinInput from "react-pin-input"
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";

//Custom components
import { Spinner } from 'components';

import { useOnboardContext } from '../store/OnboardMerchantContext';

//APIs
import { useMutation, mutateFunction } from 'libs/apis';
import { setAuthUser } from "libs/auth";
import { useSnackbar } from 'notistack';


const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: theme.palette.primary.background,
        margin: "0",
        padding: "0",
        fontFamily: theme.custom.typography,
        height: '100vh',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        maxWidth: '500px',
        marginTop: theme.spacing(2),
        alignItems: 'center'
    },
    signUpText: {
        color: theme.custom.secondary.main,
        fontFamily: theme.custom.typography,
        marginTop: '30px',
        fontSize: "24px",
        fontWeight: "900",
        fontHeight: "48px",
    },
    changeEmail: {
        color: '#FFFFFF',
        textDecoration: 'none',
        textTransform: 'capitalize',
        fontSize: 13,
        display: 'inline-flex',
        justifyContent: 'center',
        width: '100%'
    },
    bnLogo: {
        margin: theme.spacing(2, 0, 4),
        height: '40px',
    },
    pinLogo: {
        margin: theme.spacing(1, 0, 1),
        height: '190px',
    },
    introText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: "15px"
    },
    bottomText: {
        alignItems: 'center',
        margin: 'auto',
    },
    logo: {
        marginBottom: theme.spacing(4),
        width: '20px',
        height: '20px',
    }
}));

function EmailConfirmation({ onComplete, goTo }) {
    const classes = useStyles();

    const { mutate, isLoading } = useMutation(mutateFunction);

    const { mutate: resend, isLoading: resending } = useMutation(mutateFunction);

    const { enqueueSnackbar } = useSnackbar();

    const { onboardState } = useOnboardContext();

    const verifyOTPCreateAccount = (otp) => {
        // return onComplete()
        mutate({ key: 'auth/merchants/create-account', method: 'post', data: { ...onboardState.personalDetails, otp } }, {
            onSuccess(res) {
                console.log({ res });
                enqueueSnackbar(res.message, { variant: 'success' });
                setAuthUser(res.data);
                onComplete()
            }
        })
    }

    const resendOTP = () => {
        const email = onboardState.personalDetails.email;
        resend({ key: 'auth/resend-otp', method: 'post', data: { email } }, {
            onSuccess(res) {
                enqueueSnackbar(res.message, { variant: 'success' })
            }
        })
    }

    return (
        <Box className={classes.background}>

            <CssBaseline />
            <div className={classes.paper} >
                <div className={classes.bnLogo}>
                    <img src={BnLogo} className={classes.bnLogo} alt="logo" />
                </div>
                <div className={classes.pinLogo}>
                    <img src={PinLogo} className={classes.pinLogo} alt="logo" />
                </div>


                <Typography component="h1" variant="h5" className={classes.signUpText}>
                    Verify your email address
                </Typography>
                <p className={classes.introText}>
                    please enter the code sent to {onboardState.personalDetails.email}
                </p>
                <form className={classes.form} noValidate
                >
                    <PinInput
                        length={5}
                        secret
                        inputPlaceholder='*'
                        type="numeric"
                        inputMode="number"
                        style={{ padding: '10px', alignItems: 'center', textAlign: 'center' }}
                        inputStyle={{ border: '0', marginLeft: '10px', backgroundColor: '#FFFFFF', borderRadius: '6px', textAlign: 'center' }}
                        onComplete={verifyOTPCreateAccount}
                        autoSelect={true}
                        regexCriteria={/^[0-9]*$/}
                    />
                    <Button onClick={() => goTo(0)} variant="text" className={classes.changeEmail}>
                        Change Email Address
                    </Button>
                    <Box textAlign="center" mt={4}>
                        <Button onClick={resendOTP} disabled={isLoading || resending} className={classes.changeEmail} style={{ border: 'solid 1px', width: 'auto' }}>
                            {isLoading || resending ? <Spinner text={resending ? 'Resending...' : 'Verifying...'} textStyle={{ color: 'white' }} spinnerStyle={{ color: 'white' }} /> : "Resend code"}
                        </Button>
                    </Box>
                </form>
            </div>
        </Box>
    );
}

export default EmailConfirmation;