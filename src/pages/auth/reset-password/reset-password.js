import React from "react";
import BnLogo from "assets/images/signup.png";
import StyledTextField from "components/StyledTextField/StyledTextField";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';



import { ValidationError, Spinner } from "components";

//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";

//schemas
import { forgotPasswordSchema } from "validators";

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
        marginTop: theme.spacing(3),
        alignItems: 'center'
    },
    submit: {
        height: '40spx',
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

    const { replace } = useHistory();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
    });

    const forgotPassword = (values) => {
        mutate({ key: 'auth/forgot-password', method: 'post', data: values }, {
            onSuccess(res) {
                // console.log('res', res);
                enqueueSnackbar(res.message, { variant: 'success' });
                replace('/change-password');
            }
        })
    }

    return (
        <Box className={classes.background}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className={classes.paper} >
                    <Box mt="20px" mb="45px" height="55px">
                        <img style={{ height: '100%' }} src={BnLogo} alt="logo" />
                    </Box>
                    <Typography component="h1" variant="h6" className={classes.signUpText}>
                        Reset Password
                    </Typography>
                    <Typography component="h6" variant="h6" className={classes.introText}>
                        We can help recover your forgotten password
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit(forgotPassword)}>
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
                        <Box mt={2}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isLoading}
                            >
                                {isLoading ? <Spinner text="Loading..." /> : 'Send password recovery email'}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Container>
        </Box>
    );
}

export default SignIn;