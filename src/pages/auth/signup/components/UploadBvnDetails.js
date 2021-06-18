import React,{useState} from "react";
// import { useForm } from "react-hook-form"
import BnLogo from "../../../../assets/icons/favicon-32x32.png";
import SideImage from "../../../../components/StyledSideImage/SideImage.js";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import StyledTextField from '../../../../components/StyledTextField/StyledTextField';
import StyledImageInput from '../../../../components/StyledImageInput/StyledImageInput';
import { Box } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: "#FFFFFF", 
        margin: "0",
        padding: "0",
        fontFamily: theme.custom.typography,
        height:'100vh',
        position: 'fixed',
        overflow:'hidden'
    },
    paper: {
      paddingTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    },
    avatar: {
      margin: theme.spacing(1),
    },
    form: {
      width: '360px',
      marginTop: theme.spacing(2),
      alignItems: 'center',
    },
    submit: {
      width: '360px',
      height: '48px',
      margin: theme.spacing(3, 0, 4),
      textTransform:'lowercase',
      overflowY:'hidden',
    },
    signUpText: {
        color: theme.custom.secondary.main,
        fontFamily: theme.custom.typography,
        fontSize: "30px",
        fontWeight: "900",
        fontHeight: "48px",
    },
    fieldText:{
        marginBottom:'10px',
        fontFamily: theme.custom.typography,
    },
    blackColor:{
        color: '#000000',
        textDecoration: 'none',
    },
    introText:{
        padding: '6px 80px 0',
        alignSelf:'self',
        color: theme.palette.secondary.main,
    },
    introText2:{
        padding: '6px 40px 0',
        alignSelf:'center',
        fontSize: '17px',
        textAlign: 'center',
        color: theme.palette.secondary.main,
    },
    infoText:{
        backgroundColor: '#4C6EF5',
        TextColor: '#4C6EF5',
        padding: '2px',
        marginRight: '2px',
        fontSize: '10px',
        fontFamily: theme.custom.typography,
    },
    logo:{
        marginBottom: theme.spacing(4),
        width: '20px',
        height: '20px',
    },
   closedButton:{
       color:'#513166',
       border: 0,
       backgroundColor: '#EDF1FE',
   }
  }));

const BranchDetailsForm = props => {
    const [openState, setOpenState]= useState(false)
    const handleOpenState = ()=>{
        setOpenState(!openState)
    }
    const classes = useStyles();
    const overflowBackground = {
        overflowY:'hidden'
    }
    if (openState){ overflowBackground.overflowY = "scroll"}
    return (
        <Grid container className={classes.background}>
            <Grid item xs={7} className={classes.paper} style={overflowBackground}>
                        <section>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <Container className={classes.paper} >
                                    <div className= {classes.logo}>
                                        <img src={BnLogo} alt="logo" />
                                    </div>
                                    <Typography component="h1" variant="h5" className={classes.signUpText}>
                                        Sign up
                                    </Typography>
                                    <Typography component="p" className={classes.introText2}>
                                        Thanks for staying with us, now for the final step 
                                    </Typography>
                                    <div className={classes.form} noValidate>
                                        <StyledImageInput
                                            name="companydocument"
                                        />
                                        <StyledTextField
                                            margin="normal"
                                            id="bvn"
                                            label="Bank Verification Number(11 digits)"
                                            type="text"
                                            name="bvn"
                                            className={classes.fieldText}
                                        />
                                        <Box  px={2} py={1} mt={2} mb={3} bgcolor='#EDF1FE'  borderRadius={5} alignItems="center"
                                        style={{
                                            fontSize:"10px"
                                        }}>
                                            <Box display='flex' color='#513166' 
                                            style={{
                                            fontSize:"14px",
                                            alignItems: "center",
                                            }}>
                                                <Box 
                                                style={{
                                                    height: "17px",
                                                    width: "17px"
                                                }}>
                                                    <svg
                                                    className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                                                    </svg>
                                                </Box>
                                                <Box mx={2} mr={8} mt={0}>
                                                    <p className="classes.infoText">
                                                        Why we need your BVN
                                                    </p>
                                                </Box>
                                                { !openState &&
                                                    <button
                                                    className={classes.closedButton}
                                                    style={{
                                                        margin: '0',
                                                        color: '513166'
                                                    }}
                                                    onClick={handleOpenState}
                                                    >
                                                        Show
                                                    </button>
                                                }
                                                { openState &&
                                                <Button
                                                type="button"
                                                variant="contained"
                                                color="#A898B3"
                                                style={{
                                                    color: "#513166",
                                                    backgroundColor:"#A898B3",
                                                    width:"13px",
                                                    height: "20px"
                                                }}
                                                onClick={handleOpenState}
                                                >
                                                    Hide
                                                </Button>
                                                }
                                            </Box>
                                           {openState  && (<Box color="#9783A3" mx={4}>
                                                <p  className="classes.infoText">
                                                    We need to verify these information.
                                                    <ul>
                                                        <li>Full Name</li>
                                                        <li>Phone Number</li>
                                                        <li>Date of Birth</li>
                                                    </ul>
                                                    Rest assured we do not have access to your banking/transactions  records
                                                </p>
                                            </Box>)
                                            }
                                        </Box>
                                        <Box color='#9783A3' my={-1}>
                                        <Checkbox
                                        value="checkedA"
                                        inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                         I agree to the  
                                        <Link href="#"> terms of service</Link>
                                        </Box>
                                        <Button
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick= {props.onClick}
                                        >
                                            Create account
                                        </Button>
                                        <Box mt={-2} mb={2} style={{
                                            textAlign: 'center',
                                        }}>
                                            <span>Already have an account?  </span>
                                            <Link href="/signin" className="classes.blackColor">
                                                    Sign in
                                            </Link>
                                        </Box>
                                    </div>
                                </Container>
                            </Container>
                        </section>
            </Grid>
            <Grid item xs={5} className= {classes.sideGrid}>
                <SideImage/>
            </Grid>
        </Grid>
    );
}

export default BranchDetailsForm;