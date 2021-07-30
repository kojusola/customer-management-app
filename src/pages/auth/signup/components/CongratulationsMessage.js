import React from "react";
import BnLogo from "assets/icons/faviconPinInput.svg";
import SuccessfulLogo from "assets/images/signupSuccessful.svg";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: theme.palette.success.background, 
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
      width: '600px',
      marginTop: theme.spacing(2),
      alignItems: 'center'
    },
    signUpText: {
        color: theme.custom.secondary.main,
        fontFamily: theme.custom.typography,
        marginTop:'30px',
        fontSize: "24px",
        fontWeight: "900",
        fontHeight: "48px",
    },
    blackColor:{
        color: '#FFFFFF',
        textDecoration: 'none',
    },
    bnLogo:{
        margin: theme.spacing(2, 0, 3),
        height:'40px',
    },
    SuccessfulLogo:{
        margin: theme.spacing(2, 0, 2),
        height:'190px',
    },
    introText:{
        alignSelf:'center',
        textAlign:'center',
        color: '#EEEBF0',
        fontSize: "10px",
        width: '400px',
        margin: theme.spacing(2,2, 1),
    },
    bottomText:{
        alignItems:'center',
        margin:'auto',
    },
    logo:{
        marginBottom: theme.spacing(4),
        width: '20px',
        height: '20px',
    },
    submit: {
        width: '360px',
        height: '48px',
        margin: theme.spacing(3, 0, 2),
        textTransform:'lowercase',
        textColor: '#513166',
      }
  }));

function CongratulationsMessage() {
    const classes = useStyles();
    return (
        <Container container disableGutters className={classes.background}>
            <Container item xs={7} className={classes.paper}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper} >
                        <div className={classes.bnLogo}>
                            <img src={BnLogo} className={classes.bnLogo} alt="logo" />
                        </div>
                        <div className={classes.SuccessfulLogo }>
                            <img src={SuccessfulLogo } className={classes.SuccessfulLogo } alt="SuccesfulImage" />
                        </div>
                        

                        <Typography component="h1" variant="h5" className={classes.signUpText}>
                        Account created 
                        </Typography>
                        <p className={classes.introText}>
                        Thanks for staying with us, all the way, your account has been successfully created, you can now proceed to signing in
                        </p>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            style={{
                                Color:'#513166',
                                backgroundColor : '#FFFFFF'
                            }}
                        >
                                Proceed to Dashboard
                        </Button>
                    </div>
                </Container>
            </Container>
        </Container>
    );
}

export default CongratulationsMessage;