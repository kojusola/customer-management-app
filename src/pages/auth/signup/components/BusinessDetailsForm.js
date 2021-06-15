import React from "react";
import BnLogo from "../../../../assets/icons/favicon-32x32.png";
import SideImage from "../../../../components/StyledSideImage/SideImage.js";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import states from './states';
import StyledSelect from '../../../../components/StyledSelectField/StyledSelectField';
import StyledTextField from '../../../../components/StyledTextField/StyledTextField';


const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: "#FFFFFF", 
        margin: "0",
        padding: "0",
        fontFamily: theme.custom.typography,
    },
    paper: {
      marginTop: theme.spacing(2),
      width:'100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
    },
    form: {
      width: '360px',
      marginTop: theme.spacing(2),
      alignItems: 'center'
    },
    submit: {
      width: '360px',
      height: '48px',
      margin: theme.spacing(3, 0, 2),
      textTransform:'lowercase',
    },
    signUpText: {
        color: theme.custom.secondary.main,
        fontFamily: theme.custom.typography,
        fontSize: "30px",
        fontWeight: "900",
        fontHeight: "48px",
    },
    fieldsText: {
        marginTop:'10px',
        fontFamily: theme.custom.typography,
    },
    sideFieldsGrid:{
        display: 'flex',
        justifyContent:'space-between'
    },
    sideFieldsText: {
        width:'170px',
        marginTop:'10px',
        fontFamily: theme.custom.typography,
    },
    selectGrid:{
        marginTop:'10px'
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
        color: theme.palette.secondary.main,
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

const BusinessDetailsForm = (props) => {
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
                                    <Typography component="p"  className={classes.introText2}>
                                        Kindly provide your business details below
                                    </Typography>
                                    <form className={classes.form} noValidate>
                                        <StyledTextField
                                            margin="normal"
                                            id="businessname"
                                            label="Business Name"
                                            name="businessname"
                                        />
                                        <StyledSelect
                                                placeholder={
                                                    <span>
                                                        Business category <sup>*</sup>
                                                    </span>
                                                }
                                                values={[]}
                                            />
                                        <StyledTextField
                                            variant="outlined"
                                            margin="normal"
                                            id="storename"
                                            label="Name of Store - Main branch"
                                            name="storename"
                                        />
                                         <StyledTextField
                                            margin="normal"
                                            name="branchaddress"
                                            label="Branch address"
                                            id="branchaddress"
                                        />
                                        <Grid container className={classes.sideFieldsGrid}>
                                            <Grid item xs={6}>
                                                <StyledTextField
                                                margin="normal"
                                                id="lga"
                                                label="LGA"
                                                type="text"
                                                name="lga"
                                                className={classes.sideFieldsText}
                                                />
                                            </Grid>
                                            <Grid item xs={6} className= {classes.sideGrid}>
                                            <div className={classes.selectGrid}>
                                                <StyledSelect
                                                    placeholder={
                                                        <span>
                                                            State <sup>*</sup>
                                                        </span>
                                                    }
                                                    values={states.map((state) => ({ value: state, label: state }))}
                                                />
                                            </div>
                                            </Grid>
                                        </Grid>
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
}

export default BusinessDetailsForm;