import React from "react";
import { useForm } from "react-hook-form"
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
import { Box } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';

const customStyles = {
    control: () => ({
      height: 20,
      minHeight: 20
    })
  };

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
      overflowY:'scroll',
      boxSizing: 'content-box'
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
      margin: theme.spacing(3, 0, 2),
      textTransform:'lowercase',
      overflowY:'hidden',
    },
    branchSubmit: {
        color: theme.palette.primary.main,
        width: '300px',
        height: '36px',
        margin: theme.spacing(2, 0, 1),
        backgroundColor: '#EEEBF0',
        textTransform: 'lowercase',
    },
    signUpText: {
        color: theme.custom.secondary.main,
        fontFamily: theme.custom.typography,
        fontSize: "30px",
        fontWeight: "900",
        fontHeight: "48px",
    },
    branchFieldText:{
        width:'300px',
        marginTop:'5px',
        fontFamily: theme.custom.typography,
        "& .MuiInputBase-root": {
            height: 36,
            "& input": {
                textAlign: "center"
                }
            },
            "& .MuiFormLabel-root": {
            fontSize :'15px',
            }
    },
    fieldText:{
        marginBottom:'10px',
        fontFamily: theme.custom.typography,
    },
    sideFieldsText: {
        width:'133px',
        marginTop:'5px',
        height: '30px',
        fontFamily: theme.custom.typography,
        "& .MuiInputBase-root": {
            height: 36,
            "& input": {
                textAlign: "center"
              }
          },
          "& .MuiFormLabel-root": {
            fontSize :'15px',
          }
    },
    selectGrid:{
        marginTop:'5px',
        marginLeft:'15px'
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
    infoText:{
        backgroundColor: '#4C6EF5',
        TextColor: '#4C6EF5',
        padding: '2px',
        marginRight: '2px',
        fontSize: '15px',
        fontFamily: theme.custom.typography,
    },
    filledBranchBox:{
        backgroundColor: '#EEEBF0',
    },
    logo:{
        marginBottom: theme.spacing(4),
        width: '20px',
        height: '20px',
    },
   branchUnfilled2:{
       height: '50px',
       width: '360px',
       alignItems: 'center',
       background:'#000000',
   }
  }));

const BranchDetailsForm = props => {
    const classes = useStyles();

    const {
        register,
        handleSubmit,
      } = useForm({ mode: "all" });
      const onSubmit = (data) => console.log(JSON.stringify(data));
    //   const handleFormCompletion = values => {
    //     window.alert(JSON.stringify(values, null, 4))
    //   }
    // const [branchState, setBranchState] = useState([]);
    //   const addbranch = (e) => {
    //       e.preventDefault();
    //     setBranchState([...newBranchState, branchState]);
    //   };
    return (
        <Grid container className={classes.background}>
            <Grid item xs={7} className={classes.paper}>
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
                                        Almost done, kindly provide details of your store branches 
                                    </Typography>
                                    <div className={classes.form} noValidate>
                                        <StyledTextField
                                            margin="normal"
                                            id="employeenumber"
                                            label="Number Of Employees"
                                            type="text"
                                            name="employeenumber"
                                            className={classes.fieldText}
                                        />
                                        <StyledTextField
                                            margin="normal"
                                            id="branchnumber"
                                            label="Name of Employee"
                                            type="text"
                                            name="branchnumber"
                                            className={classes.fieldText}
                                        />
                                        <Box  px={3} py={1} mt={2} mb={3} display='flex' bgcolor='#EDF1FE' color='#4C6EF5' borderRadius={5}>
                                            <InfoIcon mx={2}/>
                                            <Box mx={2}>
                                                <Typography component="p" className="classes.infoText">
                                                    Branch creation is optional and can be done at a later time
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box component="div" maxWidth="xs" className="classes.branchUnfilled2" border={1} borderColor='#EEEBF0' py={2} borderRadius={5}>
                                            <Container className="classes.branchUnfilled2">
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                        <StyledTextField
                                                        margin="normal"
                                                        name="branchname"
                                                        label="Branch Name"
                                                        type="text"
                                                        id="branchname"
                                                        className={classes.branchFieldText}
                                                        inputRef={register()}
                                                        />
                                                        <StyledTextField
                                                        margin="normal"
                                                        name="subbranchaddress"
                                                        label="Sub Branch Address"
                                                        type="text"
                                                        id="subbranchaddress"
                                                        className={classes.branchFieldText}
                                                        inputRef={register()}
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
                                                                inputRef={register()}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={6} className= {classes.sideGrid}>
                                                                <div className={classes.selectGrid}>
                                                                    <StyledSelect
                                                                    name="state"
                                                                    placeholder={
                                                                        <span>
                                                                            State <sup>*</sup>
                                                                        </span>
                                                                    }
                                                                    values={states.map((state) => ({ value: state, label: state }))}
                                                                    styles={customStyles}
                                                                    className={classes.sideFieldsText}
                                                                    classNamePrefix="react-select"
                                                                    menuPlacement="auto"
                                                                    maxMenuHeight={100}
                                                                    />
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    <Button
                                                    type="button"
                                                    fullWidth
                                                    variant="contained"
                                                    className={classes.branchSubmit}
                                                    elevation={0}
                                                    >
                                                    Add Branch Details
                                                    </Button>
                                                </form>
                                            </Container>
                                        </Box>
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