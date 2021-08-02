import React from "react";
import BnLogo from "assets/icons/faviconPinInput.svg";
import SuccessfulLogo from "assets/images/signupSuccessful.svg";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: theme.palette.success.background,
        height: '100vh'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    signUpText: {
        color: theme.custom.secondary.main,
        marginTop: '30px',
        fontSize: "24px",
        fontWeight: "900",
        fontHeight: "48px",
    },
    blackColor: {
        color: '#FFFFFF',
        textDecoration: 'none',
    },
    bnLogo: {
        margin: theme.spacing(2, 0, 3),
        height: '40px',
    },
    SuccessfulLogo: {
        margin: theme.spacing(2, 0, 2),
        height: '190px',
    },
    introText: {
        textAlign: 'center',
        color: '#EEEBF0',
        fontSize: "13px",
        margin: theme.spacing(2, 2, 1),
    },
    bottomText: {
        alignItems: 'center',
        margin: 'auto',
    },
    logo: {
        marginBottom: theme.spacing(4),
        width: '20px',
        height: '20px',
    },
    submit: {
        height: '48px',
        margin: theme.spacing(3, 0, 2),
        textTransform: 'none',
        textColor: '#513166',
    }
}));

function CongratulationsMessage() {
    const classes = useStyles();
    const { replace } = useHistory();
    return (
        <Box className={classes.background}>
            <Container className={classes.paper}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box className={classes.paper} >
                        <Box className={classes.bnLogo}>
                            <img src={BnLogo} className={classes.bnLogo} alt="logo" />
                        </Box>
                        <Box className={classes.SuccessfulLogo}>
                            <img src={SuccessfulLogo} className={classes.SuccessfulLogo} alt="SuccesfulImage" />
                        </Box>


                        <Typography component="h1" variant="h6" className={classes.signUpText}>
                            Account created
                        </Typography>
                        <Typography className={classes.introText}>
                            Thanks for staying with us, all the way, your account has been successfully created, you can now proceed to signing in
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            style={{
                                color: '#513166',
                                backgroundColor: '#FFFFFF'
                            }}
                            onClick={() => replace('/dashboard')}
                        >
                            Proceed to Dashboard
                        </Button>
                    </Box>
                </Container>
            </Container>
        </Box>
    );
}

export default CongratulationsMessage;