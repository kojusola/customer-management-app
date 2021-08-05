import React, { useState, useReducer } from "react";

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import EmptyQuotes from "assets/icons/EmptyQuotes.svg";
import AddNewCustomer from './components/AddNewCustomer';
import QuotePage from './components/QuotePage';
import SelectUser from "./components/SelectUser";


import { useData } from "data";

import { initialData, actionTypes, quoteReder } from './quoteReducer';



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'inherit',
        margin: "0",
        padding: "0",
        // height: "100vh"
    },

    topicText: {
        fontSize: "13px",
        color: "000000"
    },
    emptyQuotesLogo: {
        // width: "200px",
        height: "250"
    },
    emptyQuotesTopic: {
        color: theme.custom.secondary.main,
        fontSize: "20px",
        fontWeight: "600"
    },
    emptyQuotesText: {
        color: theme.palette.button.progress,
        fontSize: 14,
        maxWidth: 450,
        textAlign: "center",
        marginTop: 10,
    },
    submit: {
        maxWidth: 360,
        height: '48px',
        margin: theme.spacing(3, 0, 1),
        textTransform: 'none',
        overflowY: 'hidden',
    },


}))

function Quotes() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const [isAddCustomer, setIsAddCustomer] = useState(false);
    const [isQuote, setIsQuote] = useState(false);

    const { data } = useData('customers/all');

    const [quoteState, dispatch] = useReducer(quoteReder, initialData);

    console.log(data);

    const addCustomer = (customer) => {
        dispatch({ type: actionTypes.SET_CUSTOMER, payload: { data: customer } });
        toggleQuote()
    }

    console.log({ quoteState })

    const toggle = () => setOpen(open => !open);
    const toggleAddCustomer = () => {
        console.log('called');
        setIsAddCustomer(open => !open)
    };
    const toggleQuote = () => setIsQuote(open => !open);

    return (
        <Box className={classes.root}>
            <AddNewCustomer
                isOpen={isAddCustomer}
                toggle={toggleAddCustomer}
            />
            <QuotePage isOpen={isQuote} toggle={toggleQuote} />
            <Box mt={3} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <img src={EmptyQuotes} alt="Empty Quotes" className={classes.emptyQuotesLogo}></img>
                <Typography className={classes.emptyQuotesTopic}>No Quote Yet!</Typography>
                <Typography className={classes.emptyQuotesText}>It appears as though you haven't created a quote yet. With a quote, you can send out pricing estimates to your customers.</Typography>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={toggle}
                >
                    Create Your First Sales Quote
                </Button>
            </Box>
            <SelectUser addCustomer={addCustomer} isOpen={open} toggleAddCustomer={toggleAddCustomer} toggleDialog={toggle} />
            {/* <Dialog
                // className={classes.backdrop}
                isOpen={open}
                toggleDialog={toggle}
                titleComponent={<Box display="flex" pt={2} p={2} justifyContent="space-between" bgcolor="#EEEBF0">
                    <Typography style={{
                        fontWeight: "600"
                    }}>Select Customer</Typography>
                    <CloseDialog toggle={toggle} />
                </Box>}
            >
                <Box display="flex" flexDirection="column" justifyContent="space-between" width="100%">

                    <Box style={{
                        padding: "35px 20px 35px"
                    }}>
                        <StyledSelect
                            name="customers"
                            placeholder={
                                <span>
                                    Choose Customer <sup>*</sup>
                                </span>
                            }

                            className={classes.sideFieldsText}
                            values={data?.data?.map(value => ({ value: value.customer.id, label: `${value.customer.user.first_name} ${value.customer.user.last_name}` }))}
                            // classNamePrefix="react-select"
                            // menuPlacement="auto"
                            components={{ Menu }}
                            toggleCustomer={toggleAddCustomer}


                        />
                    </Box>
                    <Box display="flex" p={1} pt={1} bgcolor="#EEEBF0" justifyContent="flex-end" >
                        <CancelButton
                            handleOnClicked={toggle}
                        />
                        <OutlinedButton
                            handleOnClicked={toggleQuote}
                            text="Continue"

                        />
                    </Box>
                </Box>

            </Dialog> */}
        </Box>
    );
}

export default Quotes;