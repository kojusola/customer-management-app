import React from "react";
import BnLogo from "assets/images/signup.png";
import SideImage from "components/StyledSideImage/SideImage.js";
import ProgressTabs from "components/ProgressTabs/ProgressTabs.js";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import StyledTextField from 'components/StyledTextField/StyledTextField';

import { CustomHidden, ValidationError } from "components";

//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useData } from 'data';
import { useOnboardContext } from '../store/OnboardMerchantContext';

//schemas
import { createBusinessInfoSchema } from "validators";
import { SET_BUSINESS_DETAILS } from "../store/actionTypes";

import { STATES } from 'helpers/constants';



const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: "#FFFFFF",
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
        width: '90%',
        marginTop: theme.spacing(2),
        alignItems: 'center'
    },
    submit: {
        marginTop: 30,
        height: '48px',
        margin: theme.spacing(2, 0, 2),
        textTransform: 'capitalize',
    },
    signUpText: {
        color: theme.custom.secondary.main,
        fontWeight: 900,
        fontHeight: 40,
        marginBottom: 15
    },
    fieldsText: {
        marginTop: 15,
    },
    sideFieldsText: {
        marginTop: 15,
    },
    selectGrid: {
        marginTop: 15
    },
    blackColor: {
        color: '#000000',
        textDecoration: 'none',
    },
    introText: {
        maxWidth: 210,
        textAlign: 'center',
        color: theme.palette.secondary.main,
    },
    bottomText: {
        alignItems: 'center',
        margin: 'auto',
    },
}));

const BusinessDetailsForm = (props) => {
    const classes = useStyles();
    const overflowBackground = {
        overflowY: 'scroll'
    }
    const { data } = useData('store-categories');


    const { onboardState, dispatch } = useOnboardContext();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createBusinessInfoSchema),
        defaultValues: onboardState.businessDetails
    });

    const setBusinessInfo = (values) => {
        const action = { type: SET_BUSINESS_DETAILS, payload: { data: values } };
        dispatch(action);
        props.onClick()
    }

    return (
        <Box className={classes.background}>
            <Grid container >
                <Grid item xs={12} sm={7} style={overflowBackground}>
                    <section style={{ overflowX: 'hidden', width: '100%' }}>
                        <Container component="main" style={{ maxWidth: 400 }}>
                            <CssBaseline />
                            <div className={classes.paper} >
                                <Box mt="20px" mb="45px" height="55px">
                                    <img style={{ height: '100%' }} src={BnLogo} alt="logo" />
                                </Box>
                                <Typography component="h1" variant="h6" className={classes.signUpText}>
                                    Sign up
                                </Typography>
                                <Typography component="p" className={classes.introText}>
                                    Kindly provide your business details below
                                </Typography>

                                <form className={classes.form} onSubmit={handleSubmit(setBusinessInfo)} noValidate>
                                    <ProgressTabs
                                        progressNumber={1}
                                    />
                                    <Controller
                                        name="businessName"
                                        control={control}
                                        render={({ field }) => <StyledTextField
                                            margin="normal"
                                            label="Business Name"
                                            {...field}
                                        />}
                                    />
                                    <ValidationError message={errors.businessName?.message} />
                                    <Controller
                                        name="categoryId"
                                        control={control}
                                        render={({ field }) => (
                                            <StyledSelect
                                                placeholder={
                                                    <span>
                                                        Business category <sup>*</sup>
                                                    </span>
                                                }
                                                className={classes.sideFieldsText}
                                                isClearable
                                                {...field}
                                                values={data?.data?.map((category) => ({
                                                    value: category?.id,
                                                    label: category?.name,
                                                }))}
                                            />
                                        )}
                                    />
                                    <ValidationError message={errors.categoryId?.message} />
                                    {/* <StyledTextField
                                        variant="outlined"
                                        margin="normal"
                                        id="storename"
                                        label="Name of Store - Main branch"
                                        name="storename"
                                        style={{ marginTop: 20 }}
                                    /> */}
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field }) => <StyledTextField
                                            margin="normal"

                                            label="Branch address"
                                            style={{ marginTop: 25 }}
                                            {...field}
                                        />}
                                    />
                                    <ValidationError message={errors.address?.message} />
                                    <Grid container spacing={1}>
                                        <Grid item sm={6} xs={12}>
                                            <Controller
                                                control={control}
                                                name="lga"
                                                render={({ field }) => <StyledTextField
                                                    margin="normal"

                                                    label="LGA"
                                                    className={classes.sideFieldsText}
                                                    {...field}
                                                />}
                                            />
                                            <ValidationError message={errors.lga?.message} />
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            <div className={classes.selectGrid}>
                                                <Controller
                                                    name="state"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <StyledSelect
                                                            placeholder={
                                                                <span>
                                                                    State <sup>*</sup>
                                                                </span>
                                                            }
                                                            isClearable
                                                            {...field}
                                                            values={STATES.map((state) => ({
                                                                value: state,
                                                                label: state,
                                                            }))}
                                                            customStyles={{
                                                                control: (provided) => ({
                                                                    ...provided,
                                                                    minHeight: 40,

                                                                })
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <ValidationError message={errors.state?.message} />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}

                                    >
                                        Continue
                                    </Button>
                                    <Box textAlign="center" mb={10} mt={2}>
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
                <Grid item sm={5} >
                    <CustomHidden xAndUp={602}>
                        <SideImage />
                    </CustomHidden>
                </Grid>
            </Grid>
        </Box>
    );
}

export default BusinessDetailsForm;