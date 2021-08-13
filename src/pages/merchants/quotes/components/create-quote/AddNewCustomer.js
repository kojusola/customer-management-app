import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import StyledTextField from 'components/StyledTextField/StyledTextField';

import CloseDialog from "../CloseDialog";
import CancelButton from "../CancelButton";
import OutlinedButton from "../OutlinedButton";
import { Dialog } from "../Dialog";

//Custom components
import { ValidationError, Spinner } from 'components';

//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';
import { useQueryClient } from "react-query";

//schemas
import { createCustomerSchema } from "validators";

import { STATES } from 'helpers/constants';


const useStyles = makeStyles((theme) => ({
    selectGrid: {
        marginTop: '4px',
        marginLeft: '5px'
    },
    sideFieldsTextState: {
        width: '165px',
        marginTop: '5px',
        height: '25px',
        fontFamily: theme.custom.typography,
        "& .MuiInputBase-root": {
            height: 36,
            "& input": {
                textAlign: "center"
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '15px',
        }
    },
    fieldsText: {
        fontFamily: theme.custom.typography,
        height: "30px",
    },
    selectButton: {
        border: '0',
        backgroundColor: theme.palette.secondary.background,
        color: theme.palette.success.background,
        display: "flex",
        fontSize: "12px",
        padding: "10px 20px 10px",
        width: "100%",
        height: "100%",
        textAlign: "left",
        borderRadius: "2px"
    },
    cancelButton: {
        border: '0',
        backgroundColor: theme.palette.secondary.background,
        color: theme.palette.success.background,
        fontSize: "10px",
        fontWeight: "600",
        padding: "0 20px 0"
    },
    sideFieldsGrid: {
        display: "flex",
        justifyContent: 'space-between'
    },
    sideFieldsGridLeft: {
        display: "flex",
        justifyContent: 'left'
    },
    sideFieldsText: {
        width: '165px',
        fontFamily: theme.custom.typography,
    },
    sideGrid: {
        paddingLeft: "5px"

    },
    infoText: {
        backgroundColor: theme.palette.secondary.info,
        TextColor: theme.palette.secondary.info,
        padding: '2px',
        marginRight: '2px',
        fontSize: '8px',
        fontFamily: theme.custom.typography,
    },
    detailsText: {
        border: 0,
        width: "100%",
        background: theme.palette.secondary.background,
        marginTop: 5,
        borderRadius: 4,
        fontSize: 12,
        color: "#281833",
        textTransform: 'none',
        '&:hover': {
            background: theme.palette.secondary.background
        }
    }

}))

function AddNewCustomer({ toggle, isOpen }) {
    const classes = useStyles();

    const [openState, setOpenState] = useState(false)

    const client = useQueryClient()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createCustomerSchema),
    });

    const { mutate, isLoading } = useMutation(mutateFunction);


    const { enqueueSnackbar } = useSnackbar();


    const toggleOpenState = () => setOpenState(open => !open)

    const saveCustomer = (customer) => {
        const newCustomer = { ...customer, state: customer.state?.value };
        mutate({ key: 'customers', method: 'post', data: newCustomer }, {
            onSuccess(res) {
                enqueueSnackbar(res.message, { variant: 'success' });
                client.invalidateQueries('customers/all');
                toggle();
            }
        })
    }

    return (
        <Dialog isOpen={isOpen} toggleDialog={toggle}>
            <form noValidate onSubmit={handleSubmit(saveCustomer)}>
                <Box
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",

                    }}>
                    <Box display="flex" pt={2} p={2} style={{
                        justifyContent: "space-between",
                        backgroundColor: "#EEEBF0"
                    }}>
                        <Typography style={{
                            fontWeight: "600"
                        }}>Add New Customer</Typography>
                        <CloseDialog toggle={toggle} />
                    </Box>
                    <Box style={{
                        padding: "30px"
                    }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <StyledTextField
                                        margin="normal"
                                        label="First name"
                                        {...field}
                                    />}
                                />
                                <ValidationError message={errors.firstName?.message} />
                            </Grid>
                            <Grid item xs={6} >
                                <Controller
                                    name="lastName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <StyledTextField
                                        margin="normal"

                                        label="Last name"
                                        {...field}


                                    />}
                                />
                                <ValidationError message={errors.lastName?.message} />
                            </Grid>
                        </Grid>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <StyledTextField
                                margin="normal"
                                label="Email"
                                {...field}
                            />}

                        />
                        <ValidationError message={errors.email?.message} />
                        <Button
                            onClick={toggleOpenState}
                            className={classes.detailsText}>

                            {openState ? 'Hide additional details' : ' Show additional details'}

                        </Button>

                        {openState && (
                            <>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <StyledTextField
                                        margin="normal"
                                        label="Phone number"
                                        type="tel"
                                        required={false}
                                        {...field}
                                    />}
                                />
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Controller
                                            name="gender"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <StyledTextField
                                                margin="normal"
                                                label="Gender"
                                                required={false}
                                                {...field}
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Controller
                                            name="age"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <StyledTextField
                                                margin="normal"
                                                label="Age"
                                                required={false}
                                                {...field}
                                            />}
                                        />
                                    </Grid>
                                </Grid>
                                <Controller
                                    name="address"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <StyledTextField
                                        margin="normal"
                                        label="Address"
                                        required={false}
                                        {...field}
                                    />}
                                />
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Controller
                                            name="lga"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <StyledTextField
                                                margin="normal"
                                                label="LGA"
                                                required={false}
                                                {...field}
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Box mt={2}>
                                            <Controller
                                                name="state"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => <StyledSelect
                                                    placeholder="State"
                                                    values={STATES.map((state) => ({ value: state, label: state }))}
                                                    isClearable
                                                    classNamePrefix="react-select"
                                                    menuPlacement="auto"
                                                    {...field}
                                                />}
                                            />

                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Controller
                                            name="postalCode"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <StyledTextField
                                                margin="normal"
                                                label="Postal/Zip"
                                                required={false}
                                                {...field}
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Controller
                                            name="city"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <StyledTextField
                                                margin="normal"
                                                label="City"
                                                required={false}
                                                {...field}
                                            />}
                                        />
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Box>
                    <Box display="flex" pt={1} p={1} style={{
                        justifyContent: "flex-end",
                        backgroundColor: "#EEEBF0"
                    }}>
                        <CancelButton
                            handleOnClicked={toggle}
                        />
                        <OutlinedButton
                            text={isLoading ? <Spinner text="Adding..." /> : 'Add Customer'}
                            type="submit"
                            disabled={isLoading}
                        />
                    </Box>
                </Box>
            </form>
        </Dialog>

    );
}

export default AddNewCustomer;