import React from "react";
import BnLogo from "assets/images/signup.png";
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

//Custom components
import { ValidationError, CustomHidden, ProgressTabs, Spinner } from 'components';

//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';
import { useOnboardContext } from '../store/OnboardMerchantContext';

//schemas
import { registerMerchantAccountSchema } from "validators";
import { SET_PERSONAL_DETAILS } from "../store/actionTypes";


const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: "#FFFFFF",
    },
    paper: {
        maxWidth: 320,
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {

        marginTop: theme.spacing(2),
        alignItems: 'center'
    },
    submit: {
        height: '48px',
        margin: theme.spacing(1, 0, 1),
        textTransform: 'capitalize',
    },
    signUpText: {
        color: theme.custom.secondary.main,
        fontWeight: 900,
        fontHeight: 40,
        marginBottom: 15
    },
    blackColor: {
        color: '#000000',
        textDecoration: 'none',
    },
    introText: {
        maxWidth: 180,
        textAlign: 'center',
        color: theme.palette.secondary.main,
    },
    bottomText: {
        alignItems: 'center',
        margin: 'auto',
    }
}));

const PersonalDetailsForm = props => {
    const classes = useStyles();

    const { onboardState, dispatch } = useOnboardContext();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerMerchantAccountSchema),
        defaultValues: onboardState.personalDetails
    });

    const { mutate, isLoading } = useMutation(mutateFunction);


    const { enqueueSnackbar } = useSnackbar();


    const requestOTP = (values) => {
        const action = { type: SET_PERSONAL_DETAILS, payload: { data: values } }
        dispatch(action);
        mutate({ key: 'auth/send-otp', method: 'post', data: { email: values.email } }, {
            onSuccess(res) {
                enqueueSnackbar(res.message, { variant: 'success' });
                props.onClick()
            }
        })

    }

    return (
        <Box className={classes.background}>
            <Grid container >
                <Grid item xs={12} sm={7}>
                    <section style={{ overflowX: 'hidden', width: '100%' }}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <div className={classes.paper} >
                                <Box mt="20px" mb="45px" height="55px">
                                    <img style={{ height: '100%' }} src={BnLogo} alt="logo" />
                                </Box>
                                <Typography component="h1" variant="h6" className={classes.signUpText}>
                                    Sign up
                                </Typography>
                                <Typography component="h6" variant="h6" className={classes.introText}>
                                    Hello there, let's get to know you.
                                </Typography>

                                <form className={classes.form} onSubmit={handleSubmit(requestOTP)} noValidate>
                                    <ProgressTabs progressNumber={0} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Controller
                                                name="firstName"
                                                control={control}

                                                render={({ field }) => <StyledTextField
                                                    type="text"
                                                    label="First name"
                                                    margin="normal"
                                                    {...field}
                                                />}
                                            />
                                            <ValidationError message={errors.firstName?.message} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Controller
                                                control={control}

                                                name="lastName"
                                                render={({ field }) => <StyledTextField
                                                    margin="normal"
                                                    label="Last name"
                                                    type="text"
                                                    {...field}
                                                />}
                                            />
                                            <ValidationError message={errors.lastName?.message} />
                                        </Grid>
                                    </Grid>
                                    <Box>
                                        <Controller
                                            control={control}
                                            name="email"
                                            render={({ field }) => <StyledTextField
                                                margin="normal"
                                                label="Email Address"
                                                {...field}
                                            />}
                                        />
                                        <ValidationError message={errors.email?.message} />
                                    </Box>
                                    <Box>
                                        <Controller
                                            control={control}
                                            name="phoneNumber"
                                            render={({ field }) => <StyledTextField
                                                margin="normal"

                                                label="Phone Number"
                                                type="tel"
                                                {...field}
                                            />}
                                        />
                                        <ValidationError message={errors.phoneNumber?.message} />
                                    </Box>
                                    <Box>
                                        <Controller
                                            control={control}
                                            name="password"
                                            render={({ field }) => <StyledPasswordInput
                                                margin="normal"
                                                {...field}
                                            />}
                                        />
                                        <ValidationError message={errors.password?.message} />
                                    </Box>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Spinner text="Loading..." /> : 'Continue'}
                                    </Button>

                                </form>
                                <Box textAlign="center" mb={10} mt={4}>
                                    <span>Already have an account?  </span>
                                    <Link href="/signin" className="classes.blackColor">
                                        Sign in
                                    </Link>
                                </Box>
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
};

export default withRouter(PersonalDetailsForm);