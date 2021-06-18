import React from "react";
// import {useForm} from "react-hook-form"
import BnLogo from "../../../assets/icons/favicon-32x32.png";
import StyledTextField from "../../../components/StyledTextField/StyledTextField";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: "#FFFFFF", 
        margin: "0",
        padding: "0",
        fontFamily: theme.custom.typography,
    },
    paper: {
      marginTop: theme.spacing(4),
      width:'360px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '360px',
      marginTop: theme.spacing(4),
      alignItems: 'center'
    },
    submit: {
      width: '360px',
      height: '48px',
      margin: theme.spacing(3, 0, 2),
      textTransform:'lowercase',
      textColor: '#FFFFFF'
    },
    signUpText: {
        color: theme.custom.secondary.main,
        fontFamily: theme.custom.typography,
        marginTop:'60px',
        fontSize: "30px",
        fontWeight: "900",
        fontHeight: "48px",
    },
    blackColor:{
        color: '#000000',
        textDecoration: 'none',
    },
    introText:{
        padding: '6px 20px 0',
        alignSelf:'self',
        color: '#9783A3',
        fontSize: '20px',
        textAlign: 'center',
    },
    bottomText:{
        alignItems:'center',
        margin:'auto',
    },
    logo:{
        marginBottom: theme.spacing(4),
        width: '20px',
        height: '20px',
    }
  }));

function SignIn() {
    const classes = useStyles();
    // const {register, handleSubmit} =useForm;
    // const handleFormCompletion = values => {
    //     alert(JSON.stringify(values))
    //   }
    return (
        <Grid container className={classes.background}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper} >
                        <div>
                            <img src={BnLogo} alt="logo" />
                        </div>
                        <Typography component="h1" variant="h5" className={classes.signUpText}>
                        Reset Password
                        </Typography>
                        <Typography component="h5" variant="h5" className={classes.introText}>
                        We can help recover your forgotten password
                        </Typography>
                        <form className={classes.form} noValidate 
                        >
                        <StyledTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Send password recovery email
                        </Button>
                        </form>
                    </div>
                </Container>
            </Grid>
    );
}

export default SignIn;