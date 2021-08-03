import React, { useState, Fragment } from "react";

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import EmptyQuotes from "assets/icons/EmptyQuotes.svg";
import Cancel from "assets/icons/cancel.svg";
import Backdrop from '@material-ui/core/Backdrop';
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import { components } from "react-select";
import AddIcon from '@material-ui/icons/Add';
import AddNewCustomer from './components/AddNewCustomer.js';
import QuotePage from './components/QuotePage.js';
import CompletedQuotes from './components/CompletedQuotes.js';
// import Fade from '@material-ui/core/Fade';
// import CircularProgress from '@material-ui/core/CircularProgress';


const Menu = (props) => {
    const classes = useStyles();
    return (
        <Fragment>
            <components.Menu {...props}>
                <Box p={1} style={{
                    textAlign: "left",
                }}>
                    {/* <button>{props.selectProps.name}</button> */}
                    <button
                        onClick={() => {
                            props.selectProps.customerPage('customer');
                            props.selectProps.closeInitialSelect(false);
                        }}
                        className={classes.selectButton}
                    >
                        <AddIcon style={{
                            fontSize: "13px",
                            padding: "0 4px 0"
                        }} />
                        Add new customer
                    </button>
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.success.background,
        overflowY: "scroll",
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
    continueButton: {
        border: '0',
        backgroundColor: theme.palette.success.background,
        color: "#FFFFFF",
        fontSize: "11px",
        fontWeight: "600",
        width: "100px",
        paddingTop: "9px",
        paddingBottom: "9px",
    },
    cancelLogo: {
        border: '0',
        backgroundColor: theme.palette.secondary.background,
        padding: '0'
    }

}))

function Quotes() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState('');
    const [initialSelect, setInitialSelect] = useState(false);
    return (
        <Box className={classes.root}>

            {
                page !== "CompletedQuote" && (
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
                            onClick={() => {
                                setOpen(true);
                                setInitialSelect(true)
                            }}
                        >
                            Create Your First Sales Quote
                        </Button>
                    </Box>
                )
            }
            <Backdrop
                className={classes.backdrop}
                open={open}
            >
                {initialSelect === true &&
                    (<Box>
                        {/* <Fade>
                        <CircularProgress color="inherit" /> 
                    </Fade> */}
                        <Box>
                            <Box
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: "8px",
                                    minWidth: 340
                                }}>
                                <Box display="flex" pt={2} p={2} style={{
                                    justifyContent: "space-between",
                                    backgroundColor: "#EEEBF0"
                                }}>
                                    <Typography style={{
                                        fontWeight: "600"
                                    }}>Select Customer</Typography>
                                    <Button
                                        onClick={() => {
                                            setOpen(false);
                                            setInitialSelect(false)
                                        }}
                                        className={classes.cancelLogo}>
                                        <img src={Cancel} alt="cancel logo"></img>
                                    </Button>
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
                                        customerPage={setPage}
                                        closeInitialSelect={setInitialSelect}
                                    />
                                </Box>
                                <Box display="flex" pt={2} p={2} style={{
                                    justifyContent: "flex-end",
                                    backgroundColor: "#EEEBF0"
                                }}>
                                    <button
                                        onClick={() => {
                                            setOpen(false);
                                            setInitialSelect(false)
                                        }}
                                        className={classes.cancelButton}>Cancel</button>
                                    <button
                                        onClick={() => {
                                            setInitialSelect(false)
                                            setPage('QuotePage')
                                        }}
                                        className={classes.continueButton}>Continue</button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>)}
                {page === 'customer' && (
                    <AddNewCustomer
                        setInitialSelect={setInitialSelect}
                        setOpen={setOpen}
                        setPage={setPage}
                    />

                )}
                {page === 'QuotePage' && (
                    <QuotePage
                        setInitialSelect={setInitialSelect}
                        setOpen={setOpen}
                        setPage={setPage}
                    />

                )}
            </Backdrop>
            {page === 'CompletedQuote2' && (
                <CompletedQuotes
                />

            )}

        </Box>
    );
}

export default Quotes;