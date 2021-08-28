import React, { useState } from "react";
import BnLogo from "assets/images/signup.png";
import SideImage from "components/StyledSideImage/SideImage.js";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import StyledTextField from 'components/StyledTextField/StyledTextField';
import StyledImageInput from 'components/StyledImageInput/StyledImageInput';
import ProgressTabs from "components/ProgressTabs/ProgressTabs.js";
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowBackOutlined from "@material-ui/icons/ArrowBackOutlined";

import { ReactComponent as WarningIcon } from 'assets/icons/warning.svg'


import { CustomHidden, ValidationError, Spinner } from 'components';

//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from "react-redux";
import { setDocumentAction } from 'app/features/onboardingSlice';


//schemas
import { createBVNDetails } from "validators";
import { updateMerchantField } from "libs/auth";


const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: "#FFFFFF",
        margin: "0",
        padding: "0",
        fontFamily: theme.custom.typography,
        height: '100vh',
        position: 'fixed',
        overflow: 'hidden'
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
        minWidth: 320,
        marginTop: theme.spacing(2),
        alignItems: 'center',
    },
    submit: {
        height: '48px',
        margin: theme.spacing(2, 0, 3),
        textTransform: 'capitalize',
        overflowY: 'hidden',
    },
    signUpText: {
        color: theme.custom.secondary.main,
        fontWeight: 900,
        fontHeight: 40,
        marginBottom: 15
    },
    fieldText: {
        marginBottom: '10px',
        fontFamily: theme.custom.typography,
    },
    blackColor: {
        color: '#000000',
        textDecoration: 'none',
    },
    introText: {
        padding: '6px 80px 0',
        alignSelf: 'self',
        color: theme.palette.secondary.main,
    },
    introText2: {
        maxWidth: 240,
        textAlign: 'center',
        color: theme.palette.secondary.main,
    },
    infoText: {
        backgroundColor: theme.palette.secondary.info,
        TextColor: theme.palette.secondary.info,
        padding: '2px',
        marginRight: '2px',
        fontSize: '10px',
        fontFamily: theme.custom.typography,
    },
    logo: {
        marginBottom: theme.spacing(4),
        width: '20px',
        height: '20px',
    },
    closedButton: {
        color: theme.palette.button.main,
        border: 0,
        backgroundColor: theme.palette.button.background,
    }
}));

const UploadBvnDetails = ({ onClick, goTo }) => {
    const [openState, setOpenState] = useState(false)

    const onboardState = useSelector(state => state.onboarding);
    const dispatch = useDispatch()

    const { mutate, isLoading } = useMutation(mutateFunction);

    const { enqueueSnackbar } = useSnackbar();

    const classes = useStyles();
    const overflowBackground = {
        overflowY: 'scroll'
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createBVNDetails),
        defaultValues: onboardState.bvnDetails
    });

    const setBusinessDocument = (document) => {
        dispatch(setDocumentAction(document));
    }

    const handleOpenState = () => {
        setOpenState(!openState)
    }

    const onboardMerchant = (bvnDetails) => {

        const { businessDetails, branches, branchInfo, businessDocument } = onboardState;
        let data;
        if (!businessDocument) {
            data = {
                ...businessDetails,
                categoryId: businessDetails.categoryId.value,
                state: businessDetails.state.value,
                ...branchInfo,
                ...bvnDetails,
            }
            if (branches.length) {
                data = { ...data, branches }
            }
        } else {
            data = new FormData();
            for (let key in businessDetails) {
                if (key === 'categoryId') {
                    data.append('categoryId', businessDetails[key].value)
                }
                else if (key === 'state') {
                    data.append('state', businessDetails[key].value)
                }
                else {
                    data.append(`${key}`, businessDetails[key]);
                }
            }
            for (let key in bvnDetails) {
                data.append(`${key}`, bvnDetails[key]);
            }
            for (let key in branchInfo) {
                data.append(`${key}`, branchInfo[key]);
            }
            data.append('registrationDocument', businessDocument)
            if (branches.length) {
                for (let i = 0; i < branches.length; i++) {
                    const branch = branches[i];

                    data.append(`branches[${i}][name]`, branch.name);
                    data.append(`branches[${i}][address]`, branch.address);
                    data.append(`branches[${i}][lga]`, branch.lga);
                    data.append(`branches[${i}][state]`, branch.state);
                }
            }
        }
        mutate({ key: 'auth/merchants/onboard', method: 'post', data }, {
            onSuccess(res) {
                updateMerchantField(res.data.merchant);
                enqueueSnackbar(res.message, { variant: 'success' });
                onClick()
            }
        })

    }

    if (openState) { overflowBackground.overflowY = "scroll" }


    return (
        <Grid container className={classes.background}>
            <Grid item xs={12} sm={7} className={classes.paper} style={overflowBackground}>
                <section style={{ overflowX: 'hidden', width: '100%' }}>
                    <Container component="main" style={{ maxWidth: 400 }}>
                        <CssBaseline />
                        <Button onClick={() => goTo(3)} disableElevation startIcon={<ArrowBackOutlined />}> Back</Button>
                        <Container className={classes.paper} >
                            <Box mt="20px" mb="45px" height="55px">
                                <img style={{ height: '100%' }} src={BnLogo} alt="logo" />
                            </Box>
                            <Typography component="h1" variant="h6" className={classes.signUpText}>
                                Sign up
                            </Typography>
                            <Typography component="p" className={classes.introText2}>
                                Thanks for staying with us, now for the final step
                            </Typography>

                            <form className={classes.form} noValidate onSubmit={handleSubmit(onboardMerchant)}>
                                <Box mb={2}>
                                    <ProgressTabs
                                        progressNumber={3}
                                    />
                                </Box>
                                <StyledImageInput
                                    setDocumentFile={setBusinessDocument}
                                    oldFile={onboardState?.businessDocument}
                                />
                                <Controller
                                    name="bvn"
                                    control={control}
                                    render={({ field }) => <StyledTextField
                                        margin="normal"
                                        label="Bank Verification Number(11 digits)"
                                        type="text"
                                        className={classes.fieldText}
                                        {...field}
                                    />}
                                />
                                <ValidationError message={errors.bvn?.message} />
                                <Box px={2} py={1} mt={2} mb={3} bgcolor='#EDF1FE' borderRadius={5} alignItems="center"
                                    style={{
                                        fontSize: "10px"
                                    }}>
                                    <Box display='flex' color='#513166' fontSize="14px" alignItems="center" justifyContent="space-between">
                                        <Box display="flex">
                                            <WarningIcon />
                                            <Typography style={{ marginLeft: 5 }}>
                                                Why we need your BVN
                                            </Typography>
                                        </Box>

                                        {!openState &&
                                            <button
                                                className={classes.closedButton}
                                                style={{
                                                    margin: '0',
                                                    color: '#513166'
                                                }}
                                                onClick={handleOpenState}
                                            >
                                                Show
                                            </button>
                                        }
                                        {openState &&
                                            <Button
                                                type="button"
                                                variant="contained"
                                                style={{
                                                    color: "#513166",
                                                    backgroundColor: "#A898B3",
                                                    fontSize: 12
                                                }}
                                                onClick={handleOpenState}
                                            >
                                                Hide
                                            </Button>
                                        }
                                    </Box>
                                    {openState && (<Box color="#9783A3" mx={4}>
                                        <Box >
                                            We need to verify these information.
                                            <ul>
                                                <li>Full Name</li>
                                                <li>Phone Number</li>
                                                <li>Date of Birth</li>
                                            </ul>
                                            Rest assured we do not have access to your banking/transactions  records
                                        </Box>
                                    </Box>)
                                    }
                                </Box>
                                <Box color='#9783A3' my={-1}>
                                    <Controller
                                        name="agreedToTerms"
                                        control={control}
                                        render={({ field }) => <Checkbox
                                            {...field}
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />}
                                    />

                                    <Typography component="span">I agree to the</Typography>
                                    <Typography style={{ fontWeight: 600, color: '#000' }} component="span"> terms of service</Typography>
                                    <ValidationError message={errors.agreedToTerms?.message} />
                                </Box>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={isLoading}
                                    className={classes.submit}
                                >
                                    {isLoading ? <Spinner textStyle={{ color: 'white' }} spinnerStyle={{ color: 'white' }} text="Loading..." /> : 'Continue'}
                                </Button>
                                <Box textAlign="center" mb={5} mt={2}>
                                    <span>Already have an account?  </span>
                                    <Link href="/signin" className="classes.blackColor">
                                        Sign in
                                    </Link>
                                </Box>
                            </form>
                        </Container>
                    </Container>
                </section>
            </Grid>
            <Grid item sm={5} >
                <CustomHidden xAndUp={602}>
                    <SideImage />
                </CustomHidden>
            </Grid>
        </Grid>
    );
}

export default UploadBvnDetails;