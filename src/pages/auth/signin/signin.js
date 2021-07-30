import React from "react";
import BnLogo from "assets/icons/favicon-32x32.png";
import SideImage from "components/StyledSideImage/SideImage";
import StyledTextField from "components/StyledTextField/StyledTextField";
import StyledPasswordInput from "components/StyledPasswordInput/StyledPasswordInput";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: "#FFFFFF", 
        margin: "0",
        padding: "0",
        fontFamily: theme.custom.typography,
    },
    paper: {
      marginTop: theme.spacing(2),
      width:'360px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '360px',
      marginTop: theme.spacing(3),
      alignItems: 'center'
    },
    submit: {
      width: '360px',
      height: '48px',
      margin: theme.spacing(2, 0, 2),
      textTransform:'lowercase',
    },
    signUpText: {
        color: theme.custom.secondary.main,
        fontFamily: theme.custom.typography,
        marginTop:'30px',
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
        color: theme.palette.secondary.main,
    },
    bottomText:{
        alignItems:'center',
        margin:'auto',
    },
    logo:{
        marginBottom: theme.spacing(2),
        width: '20px',
        height: '20px',
    }
  }));

function SignIn() {
    const classes = useStyles();
    return (
        <Grid container disableGutters className={classes.background}>
            <Grid item xs={7} className={classes.paper}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper} >
                        <div>
                            <img src={BnLogo} alt="logo" />
                        </div>
                        <Typography component="h1" variant="h5" className={classes.signUpText}>
                        Sign in
                        </Typography>
                        <Typography component="h5" variant="h5" className={classes.introText}>
                        Welcome, please sign in to access your account
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
                        <StyledPasswordInput
                            margin="normal"
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in to account
                        </Button>
                        <Box mt={1} mx="auto"
                        style={{
                        textAlign: 'center',
                        }}>
                            <span>Forgot your password?  </span>
                            <Link href="/password-reset" className="classes.blackColor">
                                    Reset it
                            </Link>
                        </Box>
                        <Box mt={1} mx="auto"
                        style={{
                        textAlign: 'center',
                        }}>
                            <span>Don't have an account?  </span>
                            <Link href="/" className="classes.blackColor">
                                    Sign up
                            </Link>
                        </Box>
                        </form>
                    </div>
                </Container>
            </Grid>
        <Grid item xs={5} className= {classes.sideGrid}>
            <SideImage/>
        </Grid>
        </Grid>
    );
}

export default SignIn;