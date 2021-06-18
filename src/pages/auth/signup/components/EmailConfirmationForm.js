import React from "react";
import BnLogo from "../../../../assets/icons/faviconPinInput.svg";
import PinLogo from "../../../../assets/images/pin-input.svg";
import PinInput from "react-pin-input"
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: "#281833", 
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
      width: '500px',
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
        margin: theme.spacing(3, 0, 5),
        height:'40px',
    },
    pinLogo:{
        margin: theme.spacing(3, 0, 2),
        height:'190px',
    },
    introText:{
        alignSelf:'self',
        color: '#FFFFFF',
        fontSize: "10px"
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

function SignIn(props) {
    const classes = useStyles();
    // const {register, handleSubmit} =useForm;
    // const handleFormCompletion = values => {
    //     alert(JSON.stringify(values))
    //   }
    return (
        <Container container disableGutters className={classes.background}>
            <Container item xs={7} className={classes.paper}>
                <Container component="main" maxWidth="xs">
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
                        please enter the code sent to your-email@email.com
                        </p>
                        <form className={classes.form} noValidate 
                        >
                        <PinInput 
                        length={5}
                        initialValue=""
                        secret 
                        onChange={(value, index) => {}} 
                        inputPlaceholder='*'
                        type="numeric" 
                        inputMode="number"
                        style={{padding: '10px', alignItems: 'center', textAlign:'center'}}  
                        inputStyle={{border: '0', marginLeft: '10px',backgroundColor: '#FFFFFF', borderRadius: '6px', textAlign:'center'}}
                        inputFocusStyle={{borderColor: 'blue'}}
                        onComplete={(value, index) => {props.onComplete()}}
                        autoSelect={true}
                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                        />
                        <Link href="#" className="classes.blackColor" style ={{
                            color:'#FFFFFF',
                            fontSize:'13px',
                            margin: '157px',
                        }}>
                                Change Email Address
                        </Link>
                        </form>
                    </div>
                </Container>
            </Container>
        </Container>
    );
}

export default SignIn;