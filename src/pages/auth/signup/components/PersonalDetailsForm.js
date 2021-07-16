import React from "react";
import BnLogo from "assets/icons/favicon-32x32.png";
import SideImage from "components/StyledSideImage/SideImage.js";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";
import StyledTextField from 'components/StyledTextField/StyledTextField';
import StyledPasswordInput from 'components/StyledPasswordInput/StyledPasswordInput';


const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: "#FFFFFF", 
        margin: "0",
        padding: "0",
        fontFamily: theme.custom.typography,
    },
    paper: {
      marginTop: theme.spacing(1),
      width:'360px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '360px',
      marginTop: theme.spacing(2),
      alignItems: 'center'
    },
    submit: {
      width: '360px',
      height: '48px',
      margin: theme.spacing(1, 0, 1),
      textTransform:'lowercase',
    },
    sideGrid: {
        display: "left" ,
    },
    signUpText: {
        color: theme.custom.secondary.main,
        fontFamily: theme.custom.typography,
        fontSize: "30px",
        fontWeight: "900",
        fontHeight: "40px",
    },
    fieldsText: {
        fontFamily: theme.custom.typography,
    },
    selectGrid:{
        marginTop:'5px',
        marginLeft:'15px'
    },
    sideFieldsGrid:{
        display: 'flex',
        justifyContent:'space-between',
        width: '375px'
    },
    sideFieldsText: {
        width:'170px',
        fontFamily: theme.custom.typography,
    },
    blackColor:{
        color: '#000000',
        textDecoration: 'none',
    },
    introText:{
        padding: '4px 80px 0',
        alignSelf:'self',
        fontSize: '20px',
        color: theme.palette.secondary.main,
    },
    introText2:{
        padding: '4px 40px 0',
        alignSelf:'center',
        fontSize: '15px',
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

const PersonalDetailsForm = props => {
    const classes = useStyles();


    return (
        <Grid container  className={classes.background}>
            <Grid item xs={7} className={classes.paper}>
                        <section>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <div className={classes.paper} >
                                    <div className= {classes.logo}>
                                        <img src={BnLogo} alt="logo" />
                                    </div>
                                    <Typography component="h1" variant="h5" className={classes.signUpText}>
                                        Sign up
                                    </Typography>
                                    <Typography component="h5" variant="h5" className={classes.introText}>
                                        Hello there, let's get to know you.
                                    </Typography>
                                    <form className={classes.form} noValidate>
                                        <Grid container className={classes.sideFieldsGrid}>
                                            <Grid item xs={6}>
                                                <StyledTextField
                                                margin="normal"
                                                id="firstname"
                                                label="First name"
                                                type="text"
                                                name="firstname"
                                                className={classes.sideFieldsText}

                                                />
                                            </Grid>
                                            <Grid item xs={6} className= {classes.sideGrid}>
                                                <StyledTextField
                                                margin="normal"
                                                id="lastname"
                                                label="Last name"
                                                type="text"
                                                name="lastname"
                                                autoComplete="lastname"
                                                className={classes.sideFieldsText}

                                                />
                                            </Grid>
                                        </Grid>
                                        <StyledTextField
                                            margin="normal"
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                        />
                                        <StyledTextField
                                            margin="normal"
                                            id="phonenumber"
                                            label="Phone Number"
                                            type="tel"
                                            name="phonenumber"
                                        />
                                        <StyledPasswordInput
                                            margin="normal"
                                            name="password"
                                            id="password"
                                            autoComplete="current-password"
                                            className={classes.fieldsText}
                                        />
                                        <Button
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick= {props.onClick}
                                        >
                                            Continue
                                        </Button>
                                        <Box style={{
                                            textAlign: 'center',
                                        }}>
                                            <span>Already have an account?  </span>
                                            <Link href="/signin" className="classes.blackColor">
                                                    Sign in
                                            </Link>
                                        </Box>
                                        
                                    </form>
                                </div>
                            </Container>
                        </section>
                </Grid>
            <Grid item xs={5} className= {classes.sideGrid}>
                <SideImage/>
            </Grid>
        </Grid>
    );
};

export default withRouter(PersonalDetailsForm);