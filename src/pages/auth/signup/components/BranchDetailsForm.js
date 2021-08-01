import BnLogo from "assets/images/signup.png";
import SideImage from "components/StyledSideImage/SideImage.js";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import CloseOutlined from "@material-ui/icons/CloseOutlined";
import ArrowBackOutlined from "@material-ui/icons/ArrowBackOutlined";

import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import StyledTextField from 'components/StyledTextField/StyledTextField';
import ProgressTabs from "components/ProgressTabs/ProgressTabs.js";
import Box from "@material-ui/core/Box";
import InfoIcon from '@material-ui/icons/Info';

import { CustomHidden, ValidationError } from 'components';
import CreateBranch from './CreateBranch';

//APIs
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuId } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from "react";
import { useOnboardContext } from '../store/OnboardMerchantContext';

//schemas
import { createBranchInfo } from "validators";
import { ADD_BRANCH, REMOVE_BRANCH, SET_BRANCH_INFO } from "../store/actionTypes";


const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: "#FFFFFF",
        margin: "0",
        padding: "0",
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
    form: {
        marginTop: theme.spacing(2),
    },
    submit: {
        height: '48px',
        margin: theme.spacing(3, 0, 2),
        textTransform: 'capitalize',
        overflowY: 'hidden',
    },
    branchSubmit: {
        color: theme.palette.primary.main,
        // width: '300px',
        height: '36px',
        margin: theme.spacing(2, 0, 1),
        backgroundColor: theme.palette.secondary.background,
        textTransform: 'capitalize',
    },
    signUpText: {
        color: theme.custom.secondary.main,
        fontWeight: 900,
        fontHeight: 40,
        marginBottom: 15
    },
    branchFieldText: {
        // width: 300,
        // marginTop: 10,
        "& .MuiInputBase-root": {
            height: 38,
            // "& input": {
            //     textAlign: "center"
            // }
        },
        "& .MuiFormLabel-root": {
            fontSize: 15,
        }
    },
    fieldText: {
        height: 38,
    },
    sideFieldsText: {
        marginTop: 10,
        "& .MuiInputBase-root": {
            height: 38,
            // "& input": {
            //     textAlign: "center"
            // }
        },
        "& .MuiFormLabel-root": {
            fontSize: 15,
        }
    },
    blackColor: {
        color: '#000000',
        textDecoration: 'none',
    },
    introText: {
        maxWidth: 240,
        textAlign: 'center',
        color: theme.palette.secondary.main,
    },
    infoText: {
        backgroundColor: theme.palette.secondary.info,
        TextColor: theme.palette.secondary.info,
        padding: '2px',
        marginRight: '2px',
        fontSize: '15px',
    },
    filledBranchBox: {
        backgroundColor: theme.palette.secondary.background,
    },
    removeBranch: {
        position: 'absolute',
        right: 10,
        top: 5,
        color: 'red',
        border: 'solid 2px',
        borderRadius: '50%',
        cursor: 'pointer',
    }

}));

const Branch = ({ classes, name, address, state, lga }) => {
    return <Container>
        <StyledTextField
            margin="normal"
            className={classes.branchFieldText}
            value={name}
            disabled
            style={{ background: 'white' }}
        />
        <StyledTextField
            margin="normal"
            value={address}
            disabled
            style={{ background: 'white' }}
        />
        <Grid container spacing={1}>
            <Grid item sm={6} xs={12}>
                <StyledTextField
                    margin="normal"
                    value={lga}
                    disabled
                    style={{ background: 'white' }}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <Box mt={2}>
                    <StyledSelect
                        isDisabled
                        defaultValue={{ label: state, value: state }}
                        customStyles={{
                            control: (provided) => ({
                                ...provided,
                                minHeight: 41,
                                background: 'white'
                            })
                        }}
                        className={classes.sideFieldsText}
                        classNamePrefix="react-select"
                        menuPlacement="auto"
                        maxMenuHeight={100}

                    />
                </Box>

            </Grid>
        </Grid>
    </Container>
}

const BranchDetailsForm = ({ onClick, goTo }) => {
    const classes = useStyles();

    const { onboardState, dispatch } = useOnboardContext();

    const submitRef = useRef(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createBranchInfo),
        defaultValues: onboardState.branchInfo,
    });

    const overflowBackground = {
        overflowY: 'scroll'
    }

    const addBranch = (values) => {
        const action = { type: ADD_BRANCH, payload: { data: { ...values, state: values.state?.value, id: uuId() } } };
        dispatch(action);
    }
    const removeBranch = (branch) => {
        const action = { type: REMOVE_BRANCH, payload: { data: { branchId: branch.id } } };
        dispatch(action);
    }
    const setBranchInfo = (values,) => {
        const action = { type: SET_BRANCH_INFO, payload: { data: values } };
        dispatch(action);
        onClick()
    }

    return (
        <Grid container className={classes.background}>
            <Grid item xs={12} sm={7} className={classes.paper} style={overflowBackground}>
                <section style={{ overflowX: 'hidden', width: '100%' }}>
                    <Container component="main" style={{ maxWidth: 400 }}>
                        <CssBaseline />
                        <Button onClick={() => goTo(2)} disableElevation startIcon={<ArrowBackOutlined />}> Back</Button>
                        <Box className={classes.paper}>
                            <Box mt="20px" mb="45px" height="55px">
                                <img style={{ height: '100%' }} src={BnLogo} alt="logo" />
                            </Box>
                            <Typography component="h1" variant="h5" className={classes.signUpText}>
                                Sign up
                            </Typography>
                            <Typography component="p" className={classes.introText}>
                                Almost done, kindly provide details of your store branches
                            </Typography>

                            <Box>
                                <form className={classes.form} onSubmit={handleSubmit(setBranchInfo)} noValidate>
                                    <ProgressTabs
                                        progressNumber={2}
                                    />
                                    <Controller
                                        control={control}
                                        name="numberOfEmployees"

                                        render={({ field }) => <StyledTextField

                                            margin="normal"
                                            label="Number of employees"
                                            className={classes.fieldText}
                                            {...field}
                                        />}
                                    />
                                    <ValidationError message={errors.numberOfEmployees?.message} />
                                    <Controller
                                        control={control}
                                        name="numberOfBranches"

                                        render={({ field }) => <StyledTextField

                                            margin="normal"
                                            label="Number of branches"
                                            className={classes.fieldText}
                                            {...field}
                                        />}
                                    />
                                    <ValidationError message={errors.numberOfBranches?.message} />
                                    <input type="submit" hidden ref={submitRef} />
                                </form>
                                <Box px={3} py={1} mt={2} mb={3} display='flex' bgcolor='#EDF1FE' color='#4C6EF5' borderRadius={5}>
                                    <InfoIcon mx={2} />
                                    <Box mx={2}>
                                        <Typography component="p" className="classes.infoText">
                                            Branch creation is optional and can be done at a later time
                                        </Typography>
                                    </Box>
                                </Box>
                                {onboardState.branches?.map(branch => <Box position="relative" key={branch.id} component="div" mb={2} bgcolor="#EEEBF0" maxWidth="xs" border={1} borderColor='#EEEBF0' py={2} borderRadius={5}>
                                    <CloseOutlined className={classes.removeBranch} onClick={() => removeBranch(branch)} />
                                    <Container >
                                        <Branch classes={classes} {...branch} />
                                    </Container>
                                </Box>)}
                                <Box component="div" maxWidth="xs" border={1} borderColor='#EEEBF0' py={2} borderRadius={5}>
                                    <Container >
                                        <CreateBranch classes={classes} addBranch={addBranch} />
                                    </Container>
                                </Box>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() => submitRef.current.click()}
                                >
                                    Continue
                                </Button>
                                <Box textAlign="center" mb={5} mt={2}>
                                    <span>Already have an account?  </span>
                                    <Link href="/signin" className="classes.blackColor">
                                        Sign in
                                    </Link>
                                </Box>
                            </Box>

                        </Box>
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

export default BranchDetailsForm;