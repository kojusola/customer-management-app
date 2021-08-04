import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import StyledTextField from 'components/StyledTextField/StyledTextField';

import CloseDialog from "./CloseDialog";
import CancelButton from "./CancelButton";
import OutlinedButton from "./OutlinedButton";
import Dialog from "./Dialog";

import { STATES } from 'helpers/constants';




// const customStyles = {
//     control: () => ({
//         height: 20,
//         minHeight: 20
//     })
// };



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

function AddNewCustomers({ toggle, isOpen }) {
    const classes = useStyles();

    const [openState, setOpenState] = useState(false)

    const toggleOpenState = () => setOpenState(open => !open)

    return (
        <Dialog isOpen={isOpen} toggleDialog={toggle}>
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
                            <StyledTextField
                                margin="normal"
                                id="firstname"
                                label="First name"
                                type="text"
                                name="firstname"


                            />
                        </Grid>
                        <Grid item xs={6} >
                            <StyledTextField
                                margin="normal"
                                id="lastname"
                                label="Last name"
                                type="text"
                                name="lastname"
                                autoComplete="lastname"

                            />
                        </Grid>
                    </Grid>
                    <StyledTextField
                        margin="normal"
                        id="email"
                        label="Email Address"
                        name="email"
                    />

                    <Button
                        onClick={toggleOpenState}
                        className={classes.detailsText}>

                        {openState ? 'Hide additional details' : ' Show additional details'}

                    </Button>

                    {openState && (
                        <>
                            <StyledTextField
                                margin="normal"
                                id="phonenumber"
                                label="Phone Number"
                                type="tel"
                                name="phonenumber"
                            />
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <StyledTextField
                                        margin="normal"
                                        id="gender"
                                        label="Gender"
                                        type="text"
                                        name="gender"
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <StyledTextField
                                        margin="normal"
                                        id="ageRange"
                                        label="Age"
                                        type="text"
                                        name="age"
                                        autoComplete="ageRange"


                                    />
                                </Grid>
                            </Grid>
                            <StyledTextField
                                margin="normal"
                                id="address"
                                label="Address"
                                type="text"
                                name="address"
                            />
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <StyledTextField
                                        margin="normal"
                                        id="lga"
                                        label="LGA"
                                        type="text"
                                        name="lga"

                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <Box mt={2}>
                                        <StyledSelect
                                            name="state"
                                            placeholder={
                                                <span>
                                                    State <sup>*</sup>
                                                </span>
                                            }
                                            values={STATES.map((state) => ({ value: state, label: state }))}

                                            classNamePrefix="react-select"
                                            menuPlacement="auto"
                                            customStyles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    height: 41
                                                }),
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <StyledTextField
                                margin="normal"
                                id="zipCode"
                                label="Postal/Zip code "
                                type="tel"
                                name="phonenumber"
                            />
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
                        handleOnClicked={toggle}
                        text="Add Customer"
                    />
                </Box>
            </Box>
        </Dialog>

    );
}

export default AddNewCustomers;