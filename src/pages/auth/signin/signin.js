import React from "react";
import BnLogo from "assets/images/signup.png";
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


import { CustomHidden, ValidationError, Spinner } from "components";

//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';
import { setAuthUser } from "libs/auth";
import { useHistory } from "react-router-dom";

import { useAppContext } from "store/AppContext";

//schemas
import { loginSchema } from "validators";
import { SET_AUTH_USER } from "store/actionTypes";



const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: "#FFFFFF",
        height: '100vh'
    },
    paper: {
        maxWidth: 320,
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
        alignItems: 'center'
    },
    submit: {
        height: '48px',
        margin: theme.spacing(1, 0, 1),
        textTransform: 'none',
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
        maxWidth: 260,
        textAlign: 'center',
        color: theme.palette.secondary.main,
    },
    bottomText: {
        alignItems: 'center',
        margin: 'auto',
    }
}));

function SignIn() {
    const classes = useStyles();

    const { mutate, isLoading } = useMutation(mutateFunction);

    const { enqueueSnackbar } = useSnackbar();

    const { dispatch } = useAppContext();

    const { replace } = useHistory();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const login = (values) => {
        mutate({ key: 'auth/login', method: 'post', data: values }, {
            onSuccess(res) {
                enqueueSnackbar(res.message, { variant: 'success' });
                setAuthUser(res.data);
                dispatch({ type: SET_AUTH_USER, payload: { data: res.data } });
                replace('/dashboard');
            }
        })
    }

    return (
        <Grid container className={classes.background}>
            <Grid item xs={12} sm={7} >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box className={classes.paper} >
                        <Box mt="20px" mb="45px" height="55px">
                            <img style={{ height: '100%' }} src={BnLogo} alt="logo" />
                        </Box>
                        <Typography component="h1" variant="h6" className={classes.signUpText}>
                            Sign in
                        </Typography>
                        <Typography component="h6" variant="h6" className={classes.introText}>
                            Welcome, please sign in to access your account
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(login)}>
                            <Controller
                                name="email"
                                defaultValue=""
                                control={control}
                                render={({ field }) => <StyledTextField
                                    margin="normal"
                                    label="Email Address"
                                    autoComplete="email"
                                    autoFocus
                                    {...field}
                                />}
                            />
                            <ValidationError message={errors.email?.message} />
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <StyledPasswordInput
                                    margin="normal"
                                    label="Password"
                                    type="password"
                                    {...field}
                                />}
                            />
                            <ValidationError message={errors.password?.message} />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isLoading}
                            >
                                {isLoading ? <Spinner text="Signing in..." /> : 'Sign in to account'}
                            </Button>
                            <Box display="flex" flexDirection="column" justifyContent="flex-start" mt={4} alignItems="center">
                                <Box ml="-6px" mb="20px">
                                    <span>Forgot your password?  </span>
                                    <Link href="/password-reset" style={{ fontWeight: 600 }}>
                                        Reset it
                                    </Link>
                                </Box>
                                <Box>
                                    <span>Don't have an account?  </span>
                                    <Link href="/" style={{ fontWeight: 600 }}>
                                        Sign up
                                    </Link>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Container>
            </Grid>
            <Grid item sm={5} >
                <CustomHidden xAndUp={602}>
                    <SideImage />
                </CustomHidden>
            </Grid>
        </Grid>
    );
}

export default SignIn;