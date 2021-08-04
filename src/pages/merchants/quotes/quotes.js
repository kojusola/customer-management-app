import React, { useState, Fragment } from "react";

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import EmptyQuotes from "assets/icons/EmptyQuotes.svg";
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import { components } from "react-select";
import AddIcon from '@material-ui/icons/Add';
import AddNewCustomer from './components/AddNewCustomer';
import QuotePage from './components/QuotePage';


import Dialog from './components/Dialog';
import CloseDialog from "./components/CloseDialog";
import CancelButton from "./components/CancelButton";
import OutlinedButton from "./components/OutlinedButton";


const Menu = (props) => {
    const classes = useStyles();
    return (
        <Fragment>
            <components.Menu {...props}>
                <Box p={1} style={{
                    textAlign: "left",
                }}>
                    {/* <button>{props.selectProps.name}</button> */}
                    <Button
                        style={{ textTransform: 'none' }}
                        startIcon={<AddIcon />}
                        onClick={props.selectProps.toggleCustomer}
                        className={classes.selectButton}
                    >
                        Add new customer
                    </Button>
                </Box>
            </components.Menu>
        </Fragment>
    );
};



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
    selectButton: {
        border: '0',
        backgroundColor: theme.palette.secondary.background,
        color: theme.palette.success.background,
        display: "flex",
        fontSize: "12px",
        padding: "10px 20px 10px",
        width: "100%",
        height: "100%",
        justifyContent: 'flex-start'
    },

}))

function Quotes() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const [isAddCustomer, setIsAddCustomer] = useState(false);
    const [isQuote, setIsQuote] = useState(false);

    const toggle = () => setOpen(open => !open);
    const toggleAddCustomer = () => setIsAddCustomer(open => !open);
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
            <Dialog
                // className={classes.backdrop}
                isOpen={open}
                toggleDialog={toggle}
            >


                <Box borderRadius={8} width="100%">
                    <Box display="flex" pt={2} p={2} justifyContent="space-between" bgcolor="#EEEBF0">
                        <Typography style={{
                            fontWeight: "600"
                        }}>Select Customer</Typography>
                        <CloseDialog toggle={toggle} />
                    </Box>
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
                            classNamePrefix="react-select"
                            menuPlacement="auto"
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

            </Dialog>
        </Box>
    );
}

export default Quotes;